import { IUserData } from "@/utils/dtos";
import { Comment } from "./../../../../utils/types";
// get spicific comment

import prisma from "@/utils/db";
import { PUTComment } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";

export interface IProps {
  params: { id: string };
}
export async function GET(request: NextRequest, { params }: IProps) {
  try {
    const Comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!Comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Comment found", Comment },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// update comment

export async function PUT(request: NextRequest, { params }: IProps) {
  try {
    const body = await request.json();
    const oneComment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!oneComment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }

    const validation = PUTComment.safeParse(body);

    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );

    const token = request.cookies.get("authToken")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const verifiedToken = verifyToken(request) as Comment;
    if (verifiedToken.id !== oneComment.userId)
      return NextResponse.json(
        { message: "Unauthorized iddd" },
        { status: 401 }
      );

    const comment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: {
        comment: body.comment,
      },
    });

    return NextResponse.json({ message: "success", comment }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete comment

export async function DELETE(request: NextRequest, { params }: IProps) {
  try {
    const oneComment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!oneComment)
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );

    const token = verifyToken(request) as IUserData;

    if (token && token.isAdmin) {
      await prisma.comment.delete({
        where: { id: parseInt(params.id) },
      });
      return NextResponse.json({ message: "success" }, { status: 200 });
    }
    if (token === null || token.id !== oneComment.userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await prisma.comment.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
