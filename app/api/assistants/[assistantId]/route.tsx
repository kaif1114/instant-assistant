import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { assistantId: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const assistantId = params.assistantId;
  try {
    const assistant = await prisma.assistants.findUnique({
      where: { assistantId },
    });

    if (!assistant) {
      return NextResponse.json(
        {
          error: "No assistant found with specified assistantId",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({ assistant }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
