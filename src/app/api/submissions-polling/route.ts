import { responseType } from "@/types/problemType";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/db/redisConnect";
import dbConnect from "@/db/dbConnect";
import { z } from "zod";
import {
  diffLang,
  languageCode,
} from "../../../../boilerPlateGenerator/LanguageCode";
import { ObjectId } from "mongodb";
import axios from "axios";
import fs from "fs";
import path from "path";
import { responseMsg } from "../../../../boilerPlateGenerator/src/readFiles/readFile";
import Submission from "@/models/submissionModel";

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
    // language: z.enum(diffLang),
    language: z.string(),
    problemTitle: z.string().trim().min(1, "problemTitle is required"),
    status: z.string().trim().min(1, "status is required"),
    time: z.string(),
    memory: z.string(),
  })
  .strict();

type submissionType = z.infer<typeof submissionTypeValidation>;

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

    // console.log(body);

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

    type problemResponseType = {
      time: string;
      error: boolean;
      stdout: string;
      compile_output: string;
      status: string;
      memory: number;
      testCaseResult: boolean[];
    };

    const problemResponse: problemResponseType = {
      time: "",
      memory: 0,
      error: false,
      compile_output: "",
      stdout: "",
      status: "",
      testCaseResult: [],
    };

    // console.log(response);
    if (response.data.status.description === "Processing") {
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
    }
    if (
      response.data?.status?.id === 4 &&
      response.data?.status?.description === "Wrong Answer"
    ) {
      console.log("<========= WRONG ANSWER ========>");
      problemResponse.time = response.data.time;
      problemResponse.compile_output = response.data.compile_output;
      problemResponse.status = response.data.status.description;
      problemResponse.stdout = response.data.stdout;
      problemResponse.error = true;
      problemResponse.memory = response.data.memory;

      const outputFile = readOutputFiles(parseData.problemTitle);
      const output = splitString(problemResponse.stdout);
      if (
        output[output.length - 1] === "" ||
        output[output.length - 1] === "\n"
      ) {
        output.pop();
      }
      let testcaseLength = output.length;
      if (parseData.flag === "run") {
        testcaseLength = 3;
      }
      const testCaseResult = Array(testcaseLength).fill(true);
      // console.log(output);
      // console.log(outputFile.response);

      // if (output.length === outputFile.response.length) {
      for (let i = 0; i < testcaseLength; i++) {
        // console.log(output[i].trim(), " # ", outputFile.response[i].trim());
        if (output[i].trim() !== outputFile.response[i].trim()) {
          testCaseResult[i] = false;
        }
      }
      // }
      problemResponse.testCaseResult = testCaseResult;
    } else if (
      response.data?.status?.id === 3 &&
      response.data?.status?.description === "Accepted"
    ) {
      console.log("<========= Accepted========>");
      problemResponse.time = response.data.time;
      problemResponse.compile_output = response.data.compile_output;
      problemResponse.status = response.data.status.description;
      problemResponse.stdout = response.data.stdout;
      problemResponse.error = true;
      problemResponse.memory = response.data.memory;
      const output = splitString(problemResponse.stdout);
      if (
        output[output.length - 1] === "" ||
        output[output.length - 1] === "\n"
      ) {
        output.pop();
      }
      let testcaseLength = output.length;
      if (parseData.flag === "run") {
        testcaseLength = 3;
      }
      const testCaseResult = Array(testcaseLength).fill(true);
      problemResponse.testCaseResult = testCaseResult;
    } else if (
      response.data?.status?.id === 6 &&
      response.data?.status?.description === "Compilation Error"
    ) {
      console.log("<========= Compilation Error========>");
      problemResponse.time = response.data.time;
      problemResponse.compile_output = response.data.compile_output;
      problemResponse.status = response.data.status.description;
      problemResponse.stdout = response.data.stdout;
      problemResponse.error = true;
      problemResponse.memory = response.data.memory;
    } else if (
      response.data?.status.id === 5 &&
      response.data?.status?.description === "Time Limit Exceeded"
    ) {
      console.log("<========= Time Limit Exceeded=======>");
      problemResponse.time = response.data.time;
      problemResponse.compile_output = response.data.compile_output;
      problemResponse.status = response.data.status.description;
      problemResponse.stdout = response.data.stdout;
      problemResponse.error = true;
      problemResponse.memory = response.data.memory;
    } else if (
      response.data?.status?.id === 11 &&
      response.data?.status?.description === "Runtime Error (NZEC)"
    ) {
      console.log("<========= Runtime Error=======>");
      problemResponse.time = response.data.time;
      problemResponse.compile_output = response.data.compile_output;
      problemResponse.status = response.data.status.description;
      problemResponse.stdout = response.data.stdout;
      problemResponse.error = true;
      problemResponse.memory = response.data.memory;
    }

    console.log("<------------------- ACTUAL RESPONSE------------------>");
    console.log(problemResponse);

    const successResponse: responseType = {
      message: "Successfully get the problem response",
      success: "true",
      status: 200,
      messages: [
        {
          status: problemResponse.status,
          error: problemResponse.error,
          errorMessage: "",
          time: problemResponse.time,
          memory: problemResponse.memory,
          stdout: problemResponse.stdout,
          compile_output: problemResponse.compile_output,
          testCaseResult: problemResponse.testCaseResult,
        },
      ],
    };

    // store the submission in database and return the response (store onlywhen user submit the problem)

    if (parseData.flag === "submit") {
      console.log("TYPE =========> SUBMIT");
      const parseProblemId = new ObjectId(parseData.problemId);
      const parseUserId = new ObjectId(parseData.userId);
      console.log("Parse Problem Id " + parseProblemId);
      console.log("Pares user id " + parseUserId);
      const dbSubmission: submissionType = {
        problemId: parseProblemId, //parseProblemData.problemId,
        userId: parseUserId,
        code: parseData.code,
        language: parseData.language,
        problemTitle: parseData.problemTitle,
        status: problemResponse.status,
        time: String(problemResponse.time) || "N/A",
        memory: String(problemResponse.memory) || "N/A",
      };

      const response = await new Submission(dbSubmission).save();
      console.log(response);
    }

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

// Read ouput file
const filepath = path.resolve(process.cwd(), "problems");
const readOutputFiles = (title: string): responseMsg => {
  const problempath = path.join(filepath, title, "output");

  if (!fs.existsSync(problempath)) {
    // console.log("File not found");
    return {
      success: false,
      errMessage: "File not found",
      response: [],
    };
  }

  const output: string[] = [];

  for (let i = 1; i <= 10; i++) {
    const outputFilePath = path.join(problempath, `${i}.txt`);

    if (!fs.existsSync(outputFilePath)) {
      break;
    }
    const data = fs.readFileSync(outputFilePath, "utf-8");
    output.push(data);
  }

  return {
    success: true,
    response: output,
    errMessage: "No error",
  };
};

function splitString(input: string): string[] {
  const output: string[] = [];
  // console.log(input);
  input.split("$$$").map((str) => output.push(str));
  return output;
}
