import { pineconeIndex } from "@/app/pinecone-config";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ assistantId: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { assistantId } = await params;

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
export async function DELETE(request: NextRequest, { params }: Props) {
  const { assistantId } = await params;
  console.log(assistantId);
  try {
    const sessionIds = await prisma.session_details.findMany({
      where: { assistantId },
      select: { session_id: true },
    });
    console.log(sessionIds);
    // if (!sessionIds || sessionIds.length === 0) {
    //   return NextResponse.json(
    //     { error: "No sessions found for the specified assistantId" },
    //     { status: 404 }
    //   );
    // }
    // sessionIds.forEach((id) => {
    //   return { session_id: id };
    // });
    await prisma.$transaction([
      prisma.langchain_chat_histories.deleteMany({
        where: { OR: [...sessionIds] },
      }),
      prisma.session_details.deleteMany({ where: { assistantId } }),

      prisma.assistants.delete({
        where: { assistantId },
      }),
    ]);

    const pineconeNamespace = pineconeIndex.namespace(assistantId);
    await pineconeNamespace.deleteAll();
    return NextResponse.json({ message: "success" }, { status: 202 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
