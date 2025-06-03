import jwt from "jsonwebtoken";
import "dotenv/config";

import { Response } from "express";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const setTokenCookie = (res: Response, token: string) => {
  res.cookie("token", token, cookieOptions);
};

export const clearTokenCookie = (res: Response): void => {
  res.clearCookie("token", {
    ...cookieOptions,
  });
}

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
