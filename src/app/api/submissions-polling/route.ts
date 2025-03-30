import { responseType } from "@/types/problemType";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/db/redisConnect";
import dbConnect from "@/db/dbConnect";
import { z } from "zod";
import { diffLang } from "../../../../boilerPlateGenerator/LanguageCode";
import { ObjectId } from "mongodb";
import axios from "axios";

const pollingRequestTypeValidation = z
  .object({
    uniqueId: z.string().min(1, "uniqueId is required"),
  })
  .strict();

type pollingRequestType = z.infer<typeof pollingRequestTypeValidation>;
const submissionTypeValidation = z
  .object({
    problemId: z.instanceof(ObjectId, {
      message: "problemId must be mongodb instance",
    }),
    userId: z.instanceof(ObjectId, {
      message: "userId must be mongodb instance",
    }),
    code: z.string().trim().min(1, "code is required"),
    language: z.enum(diffLang),
    problemTitle: z.string().trim().min(1, "problemTitle is required"),
    status: z.string().trim().min(1, "status is required"),
    time: z.string(),
    memory: z.string(),
  })
  .strict();

type submissionsDataType = {
  cnt: number;
  error: boolean;
  errorMessage: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  problemTitle: string;
  flag: "run" | "submit";
  token: string;
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: pollingRequestType = await request.json();

    console.log(body);

    // check for the status of the problem in redis

    const problemData = await redis.get(body.uniqueId);

    if (!problemData) {
      const errorResponse: responseType = {
        message: "Invalid uniqueId",
        success: "false",
        status: 400,
      };
      return NextResponse.json(errorResponse);
    }

    const parseProblemData = JSON.parse(problemData);

    if (!parseProblemData?.submission_data) {
      const errorResponse: responseType = {
        message: "Invalid uniqueId",
        success: "false",
        status: 400,
      };
      return NextResponse.json(errorResponse);
    }

    console.log("<--------- PROBLEM DATA---------->");

    const parseData: submissionsDataType = parseProblemData.submission_data;
    console.log(parseData);

    const Url = `https://judge0-extra-ce.p.rapidapi.com/submissions/${parseData.token}`;

    const options = {
      method: "GET",
      url: Url,
      headers: {
        "x-rapidapi-key": process.env.JUDGE0_API_KEY,
        "x-rapidapi-host": process.env.JUDGE0_API_HOST,
      },
    };
    const response = await axios.request(options);

    console.log(response);
    if (
      response.data?.status?.id === 4 &&
      response.data?.status?.description === "Wrong Answer"
    ) {
      console.log("<========= WRONG ANSWER ========>");
    } else if (
      response.data?.status?.id === 3 &&
      response.data?.status?.description === "Accepted"
    ) {
      console.log("<========= Accepted========>");
    } else if (
      response.data?.status?.id === 6 &&
      response.data?.status?.description === "Compilation Error"
    ) {
      console.log("<========= Compilation Error========>");
    } else if (
      response.data?.status.id === 5 &&
      response.data?.status?.description === "Time Limit Exceeded"
    ) {
      console.log("<========= Time Limit Exceeded=======>");
    } else if (
      response.data?.status?.id === 11 &&
      response.data?.status?.description === "Runtime Error (NZEC)"
    ) {
      console.log("<========= Runtime Error=======>");
    }

    const successResponse: responseType = {
      message: "Successfully polled the problem",
      success: "true",
      status: 200,
      messages: [
        {
          status: "Pending",
        },
      ],
    };

    return NextResponse.json(successResponse);
  } catch (err) {
    console.log(err);
    const errorResponse: responseType = {
      message: "Internal server error ",
      success: "false",
      messages: [{ err: err }],
      status: 500,
    };
    return NextResponse.json(errorResponse);
  }
}
