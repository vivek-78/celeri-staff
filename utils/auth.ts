import { jwtVerify } from "jose";
import jwt from "jason"

interface JWTPayload {
  userId?: string;
}

export const verifyToken = async (token: string) => {
  try {
    const tokenPayload = await jwtVerify(
      token,
      new TextEncoder().encode("secretKey"),
    );
    return tokenPayload?.payload as JWTPayload;
  } catch {
    throw new Error("token expired");
  }
};
