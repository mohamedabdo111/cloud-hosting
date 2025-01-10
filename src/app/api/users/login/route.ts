import prisma from "@/utils/db";
import { LoginUser } from "@/utils/dtos";
import { LoginUserShema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { setCookies } from "@/utils/generateToken";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUser;

    const UserLoginValidation = await LoginUserShema.safeParse(body);

    if (!UserLoginValidation.success) {
      return NextResponse.json(
        { message: UserLoginValidation.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (body.password !== result?.password)
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );

    if (!result) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 404 }
      );
    }

    // const tokenPayload: User = ;
    const cookie = setCookies({
      id: result.id,
      email: result.email,
      isAdmin: result.isAdmin,
      username: result.username,
    });

    return NextResponse.json(
      { message: "Authiorized" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
    // return NextResponse.json({ message: "Authorized", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
