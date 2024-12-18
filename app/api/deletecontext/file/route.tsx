import { pineconeIndex } from "@/app/pinecone-config";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assistantId = searchParams.get("assistantId");
  const fileName = searchParams.get("fileName");
  if (assistantId && fileName) {
    const pineconeNamespace = pineconeIndex.namespace(assistantId);
    try {
      const result = await pineconeNamespace.listPaginated({
        prefix: fileName,
      });
      const vectorIds = result.vectors?.map((vector) => vector.id);
      if (vectorIds?.length && vectorIds?.length > 0) {
        await prisma.knowledgeSource.deleteMany({
          where: {
            assistantId: assistantId,
            source: fileName,
          },
        });
        await pineconeNamespace.deleteMany(vectorIds);
        return NextResponse.json(
          { message: "Context deleted successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "No data found for provided file name." },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to delete context" },
        { status: 500 }
      );
    }
  }
}
