import { deleteArticleApi } from "@/app/apiCalls/articleApis";
import { User } from "@/utils/types";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comment: {
          select: {
            comment: true,
            id: true,
            createdAt: true,
            user: { select: { username: true, id: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!result)
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = verifyToken(request) as User;
    if (token === null || token.isAdmin !== true) {
      return NextResponse.json(
        { message: "You are not authorized , admins only" },
        { status: 401 }
      );
    }
    const specificeArticle = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!specificeArticle) {
      return NextResponse.json({ message: " Article not found", status: 404 });
    }

    const body = await request.json();

    const UpdateArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        discription: body.discription,
      },
    });

    return NextResponse.json(UpdateArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}

export async function DELETE(
  requset: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = verifyToken(requset) as User;
    if (token === null || token.isAdmin !== true) {
      return NextResponse.json(
        { message: "You are not authorized , admins only" },
        { status: 401 }
      );
    }
    const Article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!Article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    const deleteArticleApi = await prisma.article.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json(
      { message: "Article deleted successfully", deleteArticleApi },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
