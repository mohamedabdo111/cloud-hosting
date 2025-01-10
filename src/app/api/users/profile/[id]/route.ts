import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { IUserData } from "@/utils/dtos";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const tokenCookie = request.cookies.get("authToken")?.value as string;

  if (tokenCookie === null)
    return NextResponse.json(
      { message: " token is Unauthorized" },
      { status: 401 }
    );

  const payload = verifyToken(request) as IUserData;

  if (payload?.id !== user.id)
    return NextResponse.json({ message: "Unauthorized id" }, { status: 401 });

  await prisma.user.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json(
    { message: "this user has been deleted" },
    { status: 200 }
  );
}

// get specific user

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        email: true,
        username: true,
        id: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const token = request.cookies.get("authToken")?.value as string;

    if (token === null)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(request) as IUserData;
    if (payload?.id !== user.id) {
      return NextResponse.json({ message: "Unauthorized id" }, { status: 401 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

// update user

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const token = request.cookies.get("authToken")?.value as string;

  const payload = verifyToken(request) as IUserData;
  if (token === null)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (payload?.id !== user.id)
    return NextResponse.json(
      { message: "Unauthorized token " },
      { status: 401 }
    );

  await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: {
      username: body.username,
      password: body.password,
      isAdmin: body.isAdmin,
    },
  });

  return NextResponse.json(
    { message: "user has been updated" },
    { status: 200 }
  );
}
