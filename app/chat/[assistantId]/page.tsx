import React from "react";
import Chat from "./Chat";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/prisma/client";
import { Assistants } from "@prisma/client";

interface Props {
  params: Promise<{ assistantId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ params, searchParams }: Props) => {
  const { assistantId } = await params;
  const searchParamsResolved = await searchParams;
  const isEmbedded = searchParamsResolved.embedded === "true";
  const sessionId = uuidv4();

  let assistant: Assistants | null;
  try {
    assistant = await prisma.assistants.findUnique({
      where: { assistantId },
    });
  } catch (error) {
    console.error("Error fetching assistant:", error);
    return <div>Error loading assistant</div>;
  }

  if (!assistant) {
    return <div>Assistant not found</div>;
  }

  return (
    <Chat
      assistantId={assistantId}
      assistant={assistant}
      sessionId={sessionId}
      embedded={isEmbedded}
    />
  );
};

export default Page;
