import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const assistantId = searchParams.get("assistantId");

  if (!assistantId) {
    return NextResponse.json(
      { error: "No assistantId found in query params" },
      { status: 400 }
    );
  }

  const sessions = await prisma.session_details.findMany({
    where: { assistantId: assistantId },
  });

  return NextResponse.json(sessions, { status: 200 });
}
