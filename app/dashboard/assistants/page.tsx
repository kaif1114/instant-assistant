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
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import AssistantsList from "./AssistantsList";

export default async function Page() {
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-12">
            <div>
              <CardTitle>Assistants Overview</CardTitle>
              <CardDescription>
                Manage and monitor your AI chatbots
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="assistants/create" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" /> Create New Assistant
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <AssistantsList />
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
