import jwt from "jsonwebtoken";

export const generateToken = (email: string) => {
  const expiresIn = process.env.PASSWORD_RESET_TOKEN_EXPIRY || "30m";
  return jwt.sign({ email }, process.env.TOKEN_SECRET || "", { expiresIn });
};
