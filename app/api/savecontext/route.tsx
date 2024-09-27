import { vectorStore } from "@/app/pinecone-config";
import RequestBodySchema from "@/app/schemas";
import { Document } from "@langchain/core/documents";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(process.env.OPENAI_API_KEY);

  const validation = RequestBodySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  const documents: Document[] = body.documents;

  try {
    await vectorStore.addDocuments(documents, { namespace: body.userId });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
