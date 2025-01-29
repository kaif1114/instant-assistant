"use client";
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
import { useAssistants } from "@/hooks/useAssistants";
import { useUser } from "@clerk/nextjs";
import { MoreHorizontal, Power, PowerOff } from "lucide-react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Loading from "./loading";


const AssistantsList = () => {
  const { user } = useUser();
  const { data: assistants, isError, isLoading, error } = useAssistants(user?.id!);
  const [loadingId, setLoading] = useState<String | null>(null);

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <div>{error.message}</div>
  }
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
          {assistants?.map((assistant) => (
            <TableRow key={assistant.id}>
              <TableCell className="font-medium flex items-center gap-4">
                {loadingId == assistant.assistantId && (
                  <RotatingLines
                    visible={true}
                    width="20"
                    strokeColor="black"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                )}
                {assistant.name}
              </TableCell>
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
                      <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertDialogTrigger className="w-full text-left">
                          Delete
                        </AlertDialogTrigger>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            `http://${process.env.NEXT_PUBLIC_DOMAIN}/chat/${assistant.assistantId}`
                          );
                        }}
                      >
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
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
                      <AlertDialogAction>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
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