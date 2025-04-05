import dbConnect from "@/db/dbConnect";
import { responseType } from "@/types/problemType";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import User from "@/models/UserModel";
import { sendVerificationEmails } from "@/resend/sendVerificationEmails";
import PasswordResetEmail from "../../../../emails/resetPasswordEmail";
import { sendPasswordResetEmails } from "@/resend/sendPasswordResetEmail";
import { generateToken } from "@/utils/genrateToken";

const emailValidation = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();

    const zodValidation = emailValidation.safeParse(data);

    if (!zodValidation.success) {
      const errorResponse: responseType = {
        message: fromZodError(zodValidation.error).message,
        success: "false",
        status: 400,
      };
      return NextResponse.json(errorResponse, {
        status: 400,
      });
    }

    // Checking if user with this email exists

    const user = await User.findOne({
      email: zodValidation.data.email,
    });

    if (!user) {
      const errorResponse: responseType = {
        message: "No account found!!",
        success: "false",
        status: 400,
      };
      return NextResponse.json(errorResponse, {
        status: 400,
      });
    }
    //TODO: Send email and save the jwt token for verification in the db

    // await sendVerificationEmails(
    //   user.username,
    //   user.email,
    //   "dakdfdfajsdfasdfasfdasdf",
    // );
    const token = generateToken(user.email);
    await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          passwordResetOtp: token,
        },
      },
    );
    const url = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;

    await sendPasswordResetEmails(user.username, user.email, url);
    const successResponse: responseType = {
      success: "true",
      message: "A password reset link has been sent to your email",
      status: 200,
    };
    return NextResponse.json(successResponse);
  } catch (err) {
    const errorResponse: responseType = {
      message: "Internal server error",
      success: "false",
      status: 500,
    };
    return NextResponse.json(errorResponse, {
      status: 500,
    });
  }
}
