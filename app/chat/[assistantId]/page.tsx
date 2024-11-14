import React from "react";
import Chat from "./Chat";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/prisma/client";
import { Assistants } from "@prisma/client";
interface Props {
  params: Promise<{ assistantId: string }>;
}
const sessionId = uuidv4();

const page = async ({ params }: Props) => {
  const { assistantId } = await params;
  let assistant: Assistants | null;
  try {
    assistant = await prisma.assistants.findUnique({
      where: { assistantId },
    });
  } catch (error) {}
  return (
    <Chat
      assistant={assistant!}
      sessionId={sessionId}
      assistantId={assistantId}
    />
  );
};

export default page;
