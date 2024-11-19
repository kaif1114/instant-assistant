import React from "react";
import Chats from "./chats";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { Assistants, Prisma } from "@prisma/client";

type AssistantWithSessionDetails = Prisma.AssistantsGetPayload<{
  include: { session_details: true };
}>;

const page = async () => {
  const { userId } = await auth();
  let assistants: AssistantWithSessionDetails[] = [];
  if (userId) {
    assistants = await prisma.assistants.findMany({
      where: { userId },
      include: { session_details: true },
    });
    console.log(assistants[0].session_details);
  }

  if (assistants.length != 0) {
    return <Chats Assistants={assistants} />;
  } else return <div>No Assistants found!</div>;
};

export default page;
