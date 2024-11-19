"use client";

import React, { useState } from "react";
import { ChevronRight, MessageSquare, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Assistants, session_details } from "@prisma/client";
import axios from "axios";
import { AssistantWithSessionDetails } from "@/app/schemas";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  userName: string;
  userEmail: string;
  messages: ChatMessage[];
}

interface Assistant {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  chatSessions: ChatSession[];
}

interface Props {
  Assistants: AssistantWithSessionDetails[];
}

interface Message {
  id: string;
  sessionId: string;
  message: {
    type: "ai" | "human";
    content: string;
    additional_kwargs: Record<string, unknown>;
    response_metadata: Record<string, unknown>;
    tool_calls?: any[]; // Optional, included only for "ai" type messages
    invalid_tool_calls?: any[]; // Optional, included only for "ai" type messages
  };
}

export default function ({ Assistants }: Props) {
  const [selectedChat, setSelectedChat] = useState<session_details | null>(
    null
  );
  const [selectedAssistant, setSelectedAssistant] =
    useState<AssistantWithSessionDetails | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChatSelect = async (
    assistant: AssistantWithSessionDetails,
    session: session_details
  ) => {
    try {
      const response = await axios.get(`/api/session/chat`, {
        params: { sessionId: session.session_id },
      });
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
    setSelectedAssistant(assistant);
    setSelectedChat(session);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
    setSelectedAssistant(null);
  };

  return (
    <div className="container mx-auto py-8 px-8 h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold mb-8">Your Assistant Chats</h1>
      <div className="flex gap-8 h-full">
        <div className="w-2/5 overflow-auto">
          <ScrollArea className="h-full">
            {Assistants.map((assistant) => (
              <Card key={assistant.id} className="mb-8">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={assistant.avatarUrl}
                        alt={assistant.name}
                      />
                      <AvatarFallback>
                        {assistant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{assistant.name}</CardTitle>
                      <CardDescription>{assistant.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {assistant.session_details.map((session) => (
                      <AccordionItem
                        key={session.id}
                        value={session.id.toString()}
                      >
                        <AccordionTrigger>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{session.userName}</span>
                            <span className="text-sm text-muted-foreground">
                              ({session.userEmail})
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Button
                            onClick={() => handleChatSelect(assistant, session)}
                            className="w-full"
                          >
                            View Chat <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>
        <div className="w-3/5">
          <Card className="h-full flex flex-col">
            {selectedChat && selectedAssistant ? (
              <>
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedAssistant.avatarUrl}
                          alt={selectedAssistant.name}
                        />
                        <AvatarFallback>
                          {selectedAssistant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{selectedChat.userName}</CardTitle>
                        <CardDescription>
                          {selectedChat.userEmail}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleCloseChat}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close chat</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                  <ScrollArea className="h-full w-full">
                    {messages.map((messageObj) => (
                      <div
                        key={messageObj.id}
                        className={`flex items-start space-x-2 mb-4 ${
                          messageObj.message.type === "ai"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        {messageObj.message.type === "ai" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={selectedAssistant.avatarUrl}
                              alt={selectedAssistant.name}
                            />
                            <AvatarFallback>
                              {selectedAssistant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 max-w-[70%] ${
                            messageObj.message.type === "ai"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          <p>{messageObj.message.content}</p>
                        </div>
                        {messageObj.message.type === "human" && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {selectedChat.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
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
                  Select a chat from the list on the left to view the
                  conversation.
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
