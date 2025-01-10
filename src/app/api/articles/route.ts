import { Article } from "@prisma/client";
import { createArticleSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { ArticleCountInPage } from "@/utils/constants";
import { IUserData } from "@/utils/dtos";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = verifyToken(request) as IUserData;
    if (token === null || token.isAdmin !== true) {
      return NextResponse.json(
        { message: "You are not authorized , admins only" },
        { status: 401 }
      );
    }
    const result = await createArticleSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        discription: body.discription,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server errorrrrr" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const PageNumber = request.nextUrl.searchParams.get("page") || "1";
    const articles = await prisma.article.findMany({
      skip: ArticleCountInPage * (parseInt(PageNumber) - 1),
      take: ArticleCountInPage,
      orderBy: { createdAt: "desc" },
    });

    const Count = await prisma.article.count();

    return NextResponse.json(
      { articles: articles, count: Count },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server errorrrrr" },
      { status: 500 }
    );
  }
}
