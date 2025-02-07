"use client";

import { Loader2, MessageSquare, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { AssistantWithSessionDetails } from "@/app/schemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssistants } from "@/hooks/useAssistants";
import { useConversation } from "@/hooks/useConversation";
import { useSessions } from "@/hooks/useSessions";
import { useUser } from "@clerk/nextjs";
import {
  Assistants,
  langchain_chat_histories,
  session_details,
} from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

interface Props {
  Assistants: AssistantWithSessionDetails[];
}

export default function AssistantChatsPage() {
  const { user } = useUser();
  const [selectedSession, setSelectedSession] =
    useState<session_details | null>(null);
  const { data: Assistants } = useAssistants(user ? user.id : undefined);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistants | null>(
    null
  );
  const {
    data: sessions,
    isLoading: isSessionsLoading,
    isError: isSessionsError,
    error: sessionsError,
    refetch: refetchSessions,
  } = useSessions(selectedAssistant?.assistantId || null);

  const {
    data: conversation,
    isLoading: isConversationLoading,
    isError: isConversationError,
    error: conversationError,
    refetch: refetchConversation,
  } = useConversation(selectedSession?.session_id || null);

  const handleAssistantSelect = (assistantId: string) => {
    const assistant = Assistants?.find((a) => a.assistantId === assistantId);
    setSelectedAssistant(assistant || null);
    setSelectedSession(null);
  };

  const handleRefresh = () => {
    refetchSessions();
    refetchConversation();
  };

  useEffect(() => {
    if (!selectedAssistant && Assistants && Assistants.length > 0) {
      setSelectedAssistant(Assistants[0]);
    }
  }, [Assistants]);

  useEffect(() => {
    console.log("Conversation: ", conversation);
    console.log("Selected Session: ", selectedSession?.session_id);
    console.log("Selected Assistant: ", selectedAssistant?.assistantId);
  }, [
    conversation,
    selectedSession?.session_id,
    selectedAssistant?.assistantId,
  ]);

  if (!Assistants || Assistants?.length < 1) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="rounded-full bg-primary/10 p-6 mb-6">
            <MessageSquare className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            No Assistants Found
          </h1>
          <p className="text-muted-foreground max-w-[500px] mb-6">
            Get started by creating your first AI assistant. Once created, you
            can integrate it into your website or application to start chatting
            with your users.
          </p>
          <Link href="/dashboard/assistants/create">
            <Button size="lg" className="gap-2">
              Create Your First Assistant
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8  flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Assistant Chats</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select
            onValueChange={handleAssistantSelect}
            value={selectedAssistant?.assistantId || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an assistant" />
            </SelectTrigger>
            <SelectContent>
              {Assistants?.map((assistant) => (
                <SelectItem
                  key={assistant.assistantId}
                  value={assistant.assistantId}
                >
                  {assistant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isConversationLoading}
            className="whitespace-nowrap"
          >
            <Loader2
              className={`h-4 w-4 mr-2 ${
                isConversationLoading ? "animate-spin" : ""
              }`}
            />
            Reload
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/5 h-[600px]">
          <ScrollArea className="h-full rounded-lg border bg-background">
            <div className="p-4">
              {isSessionsLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading sessions...</span>
                </div>
              ) : isSessionsError ? (
                <div className="text-center text-destructive p-8">
                  <p className="mb-2">Failed to load sessions</p>
                  <p className="text-sm mb-4 text-muted-foreground">
                    {sessionsError?.message || "An unexpected error occurred"}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refetchSessions()}
                    className="mt-2"
                  >
                    Try again
                  </Button>
                </div>
              ) : (
                selectedAssistant && (
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={selectedAssistant.avatarUrl}
                          alt={selectedAssistant.name}
                        />
                        <AvatarFallback>
                          {selectedAssistant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {selectedAssistant.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedAssistant.description}
                        </p>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {sessions?.map((session) => (
                        <AccordionItem
                          key={session.id}
                          value={session.id.toString()}
                          className="border-b"
                        >
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span className="font-normal">
                                {session.userName}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({session.userEmail})
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <Button
                              onClick={() => {
                                setSelectedSession(session);
                                refetchConversation();
                              }}
                              className="w-full"
                            >
                              View Chat
                            </Button>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="w-full lg:w-3/5 h-[600px]">
          <Card className="h-full flex flex-col">
            {isConversationError ? (
              <CardContent className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-destructive mb-2">
                  Failed to load conversation
                </p>
                <p className="text-sm mb-4 text-muted-foreground">
                  {conversationError?.message || "An unexpected error occurred"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchConversation()}
                >
                  Try again
                </Button>
              </CardContent>
            ) : selectedSession && conversation ? (
              <>
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedAssistant?.avatarUrl}
                          alt={selectedSession?.userName}
                        />
                        <AvatarFallback>
                          {selectedAssistant?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{selectedSession?.userName}</CardTitle>
                        <CardDescription>
                          {selectedSession?.userEmail}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedSession(null)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close chat</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                  <ScrollArea className="h-full w-full">
                    {isConversationLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-lg">
                          Loading messages...
                        </span>
                      </div>
                    ) : conversation.length > 0 ? (
                      conversation.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex items-start space-x-2 mb-4 ${
                            msg.message.type === "ai"
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          {msg.message.type === "ai" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={selectedAssistant?.avatarUrl}
                                alt={selectedAssistant?.name}
                              />
                              <AvatarFallback>
                                {selectedAssistant?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg p-3 max-w-[70%] ${
                              msg.message.type === "ai"
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p>{msg.message.content}</p>
                          </div>
                          {msg.message &&
                            typeof msg.message === "object" &&
                            "type" in msg.message &&
                            msg.message.type === "human" && (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {selectedSession?.userName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          No Messages Yet
                        </h3>
                        <p className="text-muted-foreground">
                          This conversation doesn't have any messages yet. Start
                          chatting to see messages here.
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </>
            ) : (
              <CardContent className="h-full flex flex-col items-center justify-center text-center">
                <MessageSquare className="h-24 w-24 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">
                  No Chat Selected
                </h2>
                <p className="text-muted-foreground">
                  Select an assistant and a chat from the list on the left to
                  view the conversation.
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
