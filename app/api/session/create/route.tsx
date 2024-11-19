import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (
    !body.session_id ||
    !body.userName ||
    !body.userEmail ||
    !body.assistantId
  ) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  try {
    console.log(
      body.assistantId,
      body.session_id,
      body.userEmail,
      body.userName
    );
    const session = await prisma.session_details.create({
      data: {
        userName: body.userName,
        userEmail: body.userEmail,
        session_id: body.session_id,
        assistantId: body.assistantId,
      },
    });
    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
