import { Assistants } from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AssistantPreview } from "./[assistantId]/AssistantPreview";
import { AssistantList } from "./List";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import { SearchParams } from "next/dist/server/request/search-params";

// Mock data for assistants
const mockAssistants: Assistants[] = [
  {
    id: 1,
    assistantId: "asst_1",
    name: "General Assistant",
    description: "A general-purpose assistant",
    Type: "support",
    Status: "active",
    userId: "user_1",
    functionality: "General assistance",
    primaryColor: "#478ACD",
    secondaryColor: "#0A0A15",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    startingMessage: "Hello! How may I help you?",
  },
  // Add more mock assistants as needed
];

export default async function page() {
  let assistants: Assistants[] = [];

  const { userId } = await auth();
  try {
    assistants = await prisma.assistants.findMany({
      where: { userId: userId! },
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container p-4 ">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/assistants">
              Assistants
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Preview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {<AssistantList assistants={assistants} />}
    </div>
  );
}
