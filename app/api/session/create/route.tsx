import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.sessionId || !body.userName || !body.userEmail) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  try {
    const session = await prisma.session_details.create({
      data: {
        userName: body.userName,
        userEmail: body.userEmail,
        session_id: body.sessionId,
      },
    });
    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
