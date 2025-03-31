import { resend } from "./resend";
import { ApiResponse } from "@/types/ApiResponse";
import PasswordResetEmail from "../../emails/resetPasswordEmail";

export async function sendPasswordResetEmails(
  username: string,
  email: string,
  otp: string,
): Promise<ApiResponse> {
  try {
    const Response = await resend.emails.send({
      from: "logiclab@amanmeenia.com",
      to: email,
      subject: "Logic Lab | Reset Password",
      react: PasswordResetEmail({ username, resetUrl: otp }),
    });
    console.log(Response, "resend email response");

    return {
      success: true,
      message: "Verification Email sent successfully",
    };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
