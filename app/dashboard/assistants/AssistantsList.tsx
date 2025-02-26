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
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MoreHorizontal, Power, PowerOff } from "lucide-react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import Loading from "./loading";

const AssistantsList = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    data: assistants,
    isError,
    isLoading,
    error,
  } = useAssistants(user ? user.id : undefined);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const updateLoadingState = (assistantId: string, isLoading: boolean) => {
    setLoadingIds((prev) =>
      isLoading
        ? [...prev, assistantId]
        : prev.filter((id) => id !== assistantId)
    );
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center p-8 text-red-600">
        Error: User authentication required. Please sign in to view assistants.
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="text-red-600">{error.message}</div>;
  }

  if (!assistants || assistants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-600">
        <p>No assistants found.</p>
        <p className="mt-2">Create your first assistant to get started!</p>
      </div>
    );
  }

  const handleDelete = async (assistantId: string) => {
    try {
      updateLoadingState(assistantId, true);
      await axios.delete(`/api/assistants/${assistantId}`);
      await queryClient.invalidateQueries({
        queryKey: ["assistants", user?.id],
      });
    } catch (error) {
      console.error("Failed to delete assistant:", error);
    } finally {
      updateLoadingState(assistantId, false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white rounded-lg border shadow-sm text-black">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assistants?.map((assistant) => (
                <TableRow key={assistant.id}>
                  <TableCell className="font-medium flex items-center gap-4">
                    {loadingIds.includes(assistant.assistantId) && (
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
                  <TableCell className="text-center">
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
                          <DropdownMenuItem className="cursor-pointer">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertDialogTrigger className="w-full text-left">
                              Delete
                            </AlertDialogTrigger>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={async () => {
                              await navigator.clipboard.writeText(
                                `https://${process.env.NEXT_PUBLIC_DOMAIN}/chat/${assistant.assistantId}`
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
                          <AlertDialogAction
                            onClick={() => handleDelete(assistant.assistantId)}
                          >
                            {loadingIds.includes(assistant.assistantId) ? (
                              <div className="flex items-center gap-2">
                                <RotatingLines
                                  strokeColor="white"
                                  strokeWidth="4"
                                  width="16"
                                />
                                <span>Deleting...</span>
                              </div>
                            ) : (
                              "Delete"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y">
          {assistants?.map((assistant) => (
            <div key={assistant.id} className="border-b p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {loadingIds.includes(assistant.assistantId) && (
                    <RotatingLines
                      visible={true}
                      width="20"
                      strokeColor="black"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  )}
                  <span className="font-medium">{assistant.name}</span>
                </div>
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
                      <DropdownMenuItem className="cursor-pointer">
                        Edit
                      </DropdownMenuItem>
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
                        This will permanently delete your assistant and remove
                        its data. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(assistant.assistantId)}
                      >
                        {loadingIds.includes(assistant.assistantId) ? (
                          <div className="flex items-center gap-2">
                            <RotatingLines
                              strokeColor="white"
                              strokeWidth="4"
                              width="16"
                            />
                            <span>Deleting...</span>
                          </div>
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>
                  <span className="block font-medium text-foreground">
                    Type
                  </span>
                  {assistant.Type}
                </div>
                <div className="flex flex-col items-center">
                  <span className="block font-medium text-foreground mb-1.5">
                    Status
                  </span>
                  <Badge
                    variant={
                      assistant.Status === "active" ? "default" : "secondary"
                    }
                  >
                    {assistant.Status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssistantsList;
