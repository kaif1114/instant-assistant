import { Bot, MoreHorizontal, Plus, Power, PowerOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/prisma/client";
import Link from "next/link";

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
  const { userId } = auth();
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assistants.map((assistant) => (
                  <TableRow key={assistant.id}>
                    <TableCell className="font-medium">
                      {assistant.name}
                    </TableCell>
                    <TableCell>{assistant.Type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          assistant.Status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {assistant.Status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            {assistant.Status === "active" ? (
                              <>
                                <PowerOff className="mr-2 h-4 w-4" />
                                <span>Deactivate</span>
                              </>
                            ) : (
                              <>
                                <Power className="mr-2 h-4 w-4" />
                                <span>Activate</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
