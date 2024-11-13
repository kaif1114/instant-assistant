import { CreateAssistantRequestSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = CreateAssistantRequestSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
  try {
    const response = await prisma.assistants.create({
      data: {
        userId: body.userId,
        assistantId: body.assistantId,
        name: body.name,
        Type: body.assistantType,
        functionality: body.functionality,
        description: body.description,
        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
        avatarUrl: body.avatarUrl,
      },
    });
    return NextResponse.json({ response }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create assistant" },
      { status: 500 }
    );
  }
}
