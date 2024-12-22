import { pineconeIndex } from "@/app/pinecone-config";
import { RecordMetadata } from "@pinecone-database/pinecone";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assistantId = searchParams.get("assistantId");
  const query = searchParams.get("query");
  if (assistantId && query) {
    const namespace = pineconeIndex.namespace(assistantId);
    const results = await namespace.listPaginated({ prefix: query });
    if (results.vectors && results.vectors.length > 1) {
      let ids: string[] = [];
      results.vectors.forEach((vector) => {
        vector.id && ids.push(vector.id);
      });
      const vectors = await namespace.fetch(ids);
      let metadata: RecordMetadata[] = [];
      Object.entries(vectors.records).forEach(([id, record]) => {
        record.metadata && metadata.push(record.metadata);
      });
      return NextResponse.json(metadata, { status: 200 });
    }
    return NextResponse.json({ error: "No vectors found" }, { status: 404 });
  } else {
    return NextResponse.json({ error: "Missing url params" }, { status: 400 });
  }
}
