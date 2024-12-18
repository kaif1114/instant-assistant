import { pineconeIndex } from "@/app/pinecone-config";
import { AssistantUpdateSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { Assistants } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import sha1 from "sha1";

interface Props {
  params: Promise<{ assistantId: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { assistantId } = await params;

  try {
    const assistant = await prisma.assistants.findUnique({
      where: { assistantId },
    });

    if (!assistant) {
      return NextResponse.json(
        {
          error: "No assistant found with specified assistantId",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({ assistant }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { assistantId } = await params;
  const body = await request.json();

  const validation = AssistantUpdateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 }
    );
  }
  try {
    const updated = await prisma.assistants.update({
      where: { assistantId },
      data: body,
    });
    return NextResponse.json({ updated }, { status: 200 });
  } catch (error) {}
  return NextResponse.json({ body }, { status: 200 });
}

async function deleteImage(url: string) {
  const regex = /\/v\d+\/([^/?]+)/;
  const publicId = url.match(regex);
  const timestamp = new Date().getTime();

  if (publicId) {
    try {
      // Make sure these environment variables are properly set
      if (
        !process.env.CLOUDINARY_API_SECRET ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      ) {
        throw new Error("Missing Cloudinary credentials");
      } else if (
        publicId[1] === "avatars/avatar1" ||
        publicId[1] === "avatars/avatar2" ||
        publicId[1] === "avatars/avatar3"
      ) {
        return;
      }

      const string = `public_id=${publicId[1]}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
      const signature = sha1(string);

      const formData = new FormData();
      formData.append("public_id", publicId[1]);
      formData.append("signature", signature);
      formData.append("api_key", process.env.CLOUDINARY_API_KEY);
      formData.append("timestamp", timestamp.toString());

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Cloudinary error:", errorData);
        throw new Error(
          `Failed to delete image: ${res.status} ${res.statusText}`
        );
      }

      return await res.json();
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { assistantId } = await params;
  console.log(assistantId);
  try {
    const sessionIds = await prisma.session_details.findMany({
      where: { assistantId },
      select: { session_id: true },
    });

    // if (!sessionIds || sessionIds.length === 0) {
    //   return NextResponse.json(
    //     { error: "No sessions found for the specified assistantId" },
    //     { status: 404 }
    //   );
    // }
    // sessionIds.forEach((id) => {
    //   return { session_id: id };
    // });
    const assistant = await prisma.assistants.findUnique({
      where: { assistantId },
    });
    await prisma.$transaction([
      prisma.langchain_chat_histories.deleteMany({
        where: { OR: [...sessionIds] },
      }),
      prisma.session_details.deleteMany({ where: { assistantId } }),
      prisma.knowledgeSource.deleteMany({ where: { assistantId } }),
      prisma.assistants.delete({
        where: { assistantId },
      }),
    ]);

    const pineconeNamespace = pineconeIndex.namespace(assistantId);
    await pineconeNamespace.deleteAll();
    deleteImage(assistant!.avatarUrl);
    return NextResponse.json({ message: "success" }, { status: 202 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
