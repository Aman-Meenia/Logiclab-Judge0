import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    console.log("ID IS ");
    console.log(id);

    const Url = `https://judge0-extra-ce.p.rapidapi.com/submissions/8b3caa03-3337-40fd-9dd8-7c607fc62c31`;

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

    return NextResponse.json({
      message: `Fetched data for ID: ${id}`,
      id,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
