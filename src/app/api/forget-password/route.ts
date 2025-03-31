import dbConnect from "@/db/dbConnect";
import { responseType } from "@/types/problemType";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import User from "@/models/UserModel";
import { verifyToken } from "@/utils/verifyToken";

const resetPasswordValidation = z.object({
  password: z.string().min(8, "Password must be 8 character or more"),
  token: z.string().min(1, "Token is required."),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();

    const zodValidation = resetPasswordValidation.safeParse(data);
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

    const decodedToken = verifyToken(zodValidation.data.token);

    if (!decodedToken) {
      const errorResponse: responseType = {
        message:
          "Invalid or expired token. Please request a new password reset link.",
        success: "false",
        status: 400,
      };

      return NextResponse.json(errorResponse, {
        status: 400,
      });
    }

    const user = await User.findOne({
      email: decodedToken.email,
    });

    if (!user || user.passwordResetOtp != zodValidation.data.token) {
      const errorResponse: responseType = {
        message:
          "Invalid or expired token. Please request a new password reset link.",
        success: "false",
        status: 400,
      };

      return NextResponse.json(errorResponse, {
        status: 400,
      });
    }

    user.password = zodValidation.data.password;
    user.passwordResetOtp = "";

    await user.save();
    const successResponse: responseType = {
      success: "true",
      message: "Password reset successfully.",
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
