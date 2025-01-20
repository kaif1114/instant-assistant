import { SelectedWebsitesRequestSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = SelectedWebsitesRequestSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    const { assistantId, websites } = validation.data;
    console.log(assistantId, websites);
    try {
        await prisma.knowledgeSource.createMany({
            data: websites,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error saving context" }, { status: 500 });
    }
    return NextResponse.json({ message: "Context saved successfully" }, { status: 200 });
}
