import { vectorStore } from "@/app/pinecone-config";
import { saveWebsiteContextRequestSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface IWebsiteScraped {
    source: string,
    type: string,
    assistantId: string,
    characterCount: number
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = saveWebsiteContextRequestSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    const { assistantId, documents } = validation.data;

    const websitesScraped: IWebsiteScraped[] = []
    const ids: string[] = []
    documents.forEach((document, index) => {
        websitesScraped.push({ source: document.metadata.url, type: "url", assistantId, characterCount: document.pageContent.length })
        ids.push(`${document.metadata.url}-${index}`)

    })
    try {
        await vectorStore.addDocuments(documents, {
            namespace: assistantId as string,
            ids,
        });
        await prisma.knowledgeSource.createMany({
            data: websitesScraped,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error saving website context" }, { status: 500 });
    }
    return NextResponse.json({ message: "Context saved successfully" }, { status: 200 });
}
