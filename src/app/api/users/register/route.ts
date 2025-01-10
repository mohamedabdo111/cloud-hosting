import prisma from "@/utils/db";
import { CreateUser } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "@/utils/validationSchemas";
import { Generagetoken, setCookies } from "@/utils/generateToken";
import { User } from "@/utils/types";
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateUser;

    const vaildation = await createUserSchema.safeParse(body);
    if (!vaildation.success)
      return NextResponse.json(
        { error: vaildation.error.issues[0].message },
        {
          status: 400,
        }
      );

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (user) {
      return NextResponse.json(
        { message: "this email already exists" },
        { status: 400 }
      );
    }
    // const newUser: User =
    await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
      select: {
        email: true,
        id: true,
        username: true,
      },
    });

    // const cookie = setCookies({
    //   id: newUser.id,
    //   email: newUser.email,
    //   username: newUser.username,
    // });

    return NextResponse.json(
      { message: "User created successfully" }
      // { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
