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
  console.log(sessionId);
  try {
    const messages = await prisma.langchain_chat_histories.findMany({
      where: { session_id: sessionId },
      orderBy: { id: "asc" },
    });
    console.log(messages);
    if (messages.length == 0) {
      return NextResponse.json(
        { error: "No chat found with provided sessionId" },
        { status: 404 }
      );
    }
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
