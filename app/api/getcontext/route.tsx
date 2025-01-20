import { pineconeIndex } from "@/app/pinecone-config";
import prisma from "@/prisma/client";
import { RecordMetadata } from "@pinecone-database/pinecone";

import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

async function getTextFieldsData(assistantId: string) {
  const namespace = pineconeIndex.namespace(assistantId);
  const results = await namespace.listPaginated({ prefix: "textfield" });
  if (results.vectors && results.vectors.length >= 1) {
    let ids: string[] = [];
    results.vectors.forEach((vector) => {
      vector.id && ids.push(vector.id);
    });
    const vectors = await namespace.fetch(ids);
    let metadata: RecordMetadata[] = [];
    Object.entries(vectors.records).forEach(([id, record]) => {
      record.metadata && metadata.push(record.metadata);
    });
    console.log(metadata);
    return metadata;
  } else {
    console.log("No text fields found");
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assistantId = searchParams.get("assistantId");

  if (assistantId) {
    const textFieldsData = await getTextFieldsData(assistantId);
    try {
      const otherSources = await prisma.knowledgeSource.findMany({
        where: { assistantId },
      });
      const characterCount = await prisma.assistants.findUnique({
        where: { assistantId },
        select: { charactersUsed: true },
      });
      return NextResponse.json(
        { textFieldsData, otherSources, characterCount },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    return NextResponse.json({ error: "Missing url params" }, { status: 400 });
  }
}
