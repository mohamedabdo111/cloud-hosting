// create new comment

import prisma from "@/utils/db";
import { IUserData } from "@/utils/dtos";
import { Comment } from "@/utils/types";
import { createCommentSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validate = await createCommentSchema.safeParse(body);
    if (!validate.success)
      return NextResponse.json(validate.error.errors[0].message, {
        status: 400,
      });

    const token = request.cookies.get("authToken")?.value as string;

    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(request) as IUserData;
    if (payload?.id !== body.userId)
      return NextResponse.json({ message: "Unauthorized id" }, { status: 401 });

    const comment = await prisma.comment.create({
      data: {
        userId: body.userId,
        articleId: body.articleId,
        comment: body.comment,
      },
    });

    return NextResponse.json(
      { message: "comment created", comment },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server errorerrr" },
      { status: 500 }
    );
  }
}

// Get all comments

export async function GET(requset: NextRequest) {
  try {
    const comments = (await prisma.comment.findMany()) as Comment[];

    const token = verifyToken(requset) as User;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (token.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin can see this content" },
        { status: 401 }
      );
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
