import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = request;
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) {
    return NextResponse.json(
      { error: "No sessionId found in query params" },
      { status: 400 }
    );
  }

  try {
    const messages = await prisma.langchain_chat_histories.findMany({
      where: { session_id: sessionId },
      orderBy: { id: "asc" },
    });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
