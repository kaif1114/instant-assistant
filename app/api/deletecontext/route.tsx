import { pineconeIndex } from "@/app/pinecone-config";
import { DeleteContextSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = DeleteContextSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.message }, { status: 400 })
  }
  const pineconeNamespace = pineconeIndex.namespace(body.assistantId);

  let ids: string[] = []

  try {
    if (body.sourceType == "files" || body.sourceType == "urls") {
      const promises = body.source.map(async (sourceObj: string) => {
        const result = await pineconeNamespace.listPaginated({
          prefix: sourceObj,
        });
        result.vectors?.forEach((vector) => {
          if (vector.id) ids.push(vector.id)
        });
      });

      await Promise.all(promises);

      if (ids.length > 0) {
        await prisma.knowledgeSource.deleteMany({
          where: {
            assistantId: body.assistantId,
            source: {
              in: body.source,
            },
          },
        });
      }
      else {
        return NextResponse.json(
          { message: "No data found for provided source." },
          { status: 404 }
        );
      }
    }
    else if (body.sourceType == "textfields")
      ids = body.source

    console.log("ids: ", ids)
    await pineconeNamespace.deleteMany(ids);
    return NextResponse.json(
      { message: "Context deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete context" },
      { status: 500 }
    );
  }

}
