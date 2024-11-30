import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { Assistants } from "@prisma/client";
import { AssistantList } from "./List";

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
    <>
      {" "}
      <Breadcrumb className="mb-6 p-4">
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
    </>
  );
}
