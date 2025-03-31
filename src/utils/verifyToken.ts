import jwt from "jsonwebtoken";

interface TokenPayload {
  email: string;
}

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decodedData = jwt.verify(
      token,
      process.env.TOKEN_SECRET || "",
    ) as TokenPayload;
    return decodedData;
  } catch (err) {
    return null;
  }
};
