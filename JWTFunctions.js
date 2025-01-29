import dotenv from "dotenv";
dotenv.config();
import JWT from "jsonwebtoken";

const { sign, verify } = JWT;

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the .env file");
}

export function generateToken(payload) {
  if (!secretKey) throw new Error("JWT_SECRET is not defined in the .env file");
  return sign(payload, secretKey);
}

export function verifyToken(token) {
  try {
    if (!secretKey)
      throw new Error("JWT_SECRET is not defined in the .env file");
    return verify(token, secretKey);
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
}
