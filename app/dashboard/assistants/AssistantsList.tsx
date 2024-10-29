"use client";
import { MoreHorizontal, Power, PowerOff } from "lucide-react";

import Alert from "@/components/Alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Assistants } from "@prisma/client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface Props {
  assistants: Assistants[];
}

const AssistantsList = ({ assistants }: Props) => {
  return (
    <>
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
              <TableCell className="font-medium">{assistant.name}</TableCell>
              <TableCell>{assistant.Type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    assistant.Status === "active" ? "default" : "secondary"
                  }
                >
                  {assistant.Status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
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
                      <AlertDialogTrigger>Delete</AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete your assistant and
                            remove its data. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                      <DropdownMenuItem
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            `http://${process.env.NEXT_PUBLIC_DOMAIN}/chat/${assistant.assistantId}`
                          );
                        }}
                      >
                        Copy Link
                      </DropdownMenuItem>
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
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AssistantsList;
