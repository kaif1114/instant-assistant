import { Bot, Plus } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import AssistantsList from "./AssistantsList";

// Sample data for assistants
// const assistants = [
//   { id: 1, name: "Customer Support Bot", status: "active", type: "Support" },
//   { id: 2, name: "Sales Assistant", status: "inactive", type: "Sales" },
//   {
//     id: 3,
//     name: "Product Recommender",
//     status: "active",
//     type: "Recommendation",
//   },
//   { id: 4, name: "FAQ Bot", status: "active", type: "Support" },
//   { id: 5, name: "Lead Qualifier", status: "inactive", type: "Sales" },
// ];

export default async function Page() {
  const { userId } = await auth();
  const assistants = await prisma.assistants.findMany({
    where: { userId: userId! },
  });
  console.log(userId);
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Assistants</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Assistants</h2>
          <Button>
            <Link href="assistants/create" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" /> Create New Assistant
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Assistants Overview</CardTitle>
            <CardDescription>
              Manage and monitor your AI chatbots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssistantsList assistants={assistants} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export Data</Button>
            <Button variant="outline">
              <Bot className="mr-2 h-4 w-4" /> Test Assistants
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
