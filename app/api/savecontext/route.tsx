import { vectorStore } from "@/app/pinecone-config";
import { RequestBodySchema } from "@/app/schemas";

import { Document } from "@langchain/core/documents";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = RequestBodySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  const documents: Document[] = body.documents;

  try {
    if (body.ids) {
      let ids: string[] = [];
      documents.map((doc) => ids.push(`textfield-${doc.metadata.id}`));
      await vectorStore.addDocuments(documents, {
        namespace: body.assistantId,
        ids,
      });
    } else {
      await vectorStore.addDocuments(documents, {
        namespace: body.assistantId,
      });
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
