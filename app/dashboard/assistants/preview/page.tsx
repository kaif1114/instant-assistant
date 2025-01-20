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
import { Assistants, PricingPlans } from "@prisma/client";
import { AssistantList } from "./List";
import PricingPlanContextProvider from "../PricingPlanContextProvider";

export default async function page() {
  let assistants: Assistants[] = [];
  let plan: PricingPlans | null = null;

  const { userId } = await auth();
  try {
    assistants = await prisma.assistants.findMany({
      where: { userId: userId! },
    });
    const user = await prisma.user.findUnique({
      where: { userId: userId! },
      select: { PricingPlans: true },
    });
    plan = user?.PricingPlans || null;

  } catch (error) {
    console.log(error);
  }

  return (
    <PricingPlanContextProvider plan={plan?.charactersLimit!}>
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
    </PricingPlanContextProvider>
  );
}
