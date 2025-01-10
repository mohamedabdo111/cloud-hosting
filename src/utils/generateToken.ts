import jwt from "jsonwebtoken";
import { User } from "./types";
import { serialize } from "cookie";

export function Generagetoken(tokenPayload: User): string {
  const token = jwt.sign(tokenPayload, process.env.private_key as string);

  return token;
}

// generate Cookies
export function setCookies(jwt: User) {
  const token = Generagetoken(jwt);

  const cookie = serialize("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 1,
  });

  return cookie;
}
