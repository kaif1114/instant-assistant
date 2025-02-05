import { CreateAssistantRequestSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Body: ", body);

  const validation = CreateAssistantRequestSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.message, { status: 400 });
  }
  try {
    const response = await prisma.assistants.create({
      data: {
        userId: body.userId,
        assistantId: body.assistantId,
        name: body.name,
        Type: body.Type,
        functionality: body.functionality,
        description: body.description,
        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
        avatarUrl: body.avatarUrl,
        fileLimitUsed: body.fileLimitUsed,
        urlLimitUsed: body.urlLimitUsed,
        charactersUsed: body.charactersUsed,
      },
    });
    return NextResponse.json({ response }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create assistant" },
      { status: 500 }
    );
  }
}
