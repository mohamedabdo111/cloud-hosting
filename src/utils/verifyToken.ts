import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export function verifyToken(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get("authToken")?.value as string;

    const payload = jwt.verify(tokenCookie, process.env.private_key as string);
    if (!payload) return null;

    return payload;
  } catch (error) {
    return null;
  }
}

export function verifyUser(token: string) {
  // const privatKEy = process.env.private_key as string;

  try {
    const payload = jwt.verify(token, "privateKey802322990");
    if (!payload) return null;
    return payload;
  } catch (error) {
    return null;
  }
}
