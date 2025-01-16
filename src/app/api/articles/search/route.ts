import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams.get("search");
    let searchWord;
    if (searchParams) {
      searchWord = await prisma.article.findMany({
        where: {
          title: {
            contains: searchParams,
          },
        },
      });
    } else {
      searchWord = await prisma.article.findMany({
        take: 6,
      });
    }

    return NextResponse.json(searchWord, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
