"use client";

import { Loader2, MessageSquare, User, X } from "lucide-react";
import { useState } from "react";

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
import { session_details } from "@prisma/client";
import axios from "axios";

interface Props {
  Assistants: AssistantWithSessionDetails[];
}

interface Message {
  id: string;
  sessionId: string;
  message: {
    type: "ai" | "human";
    content: string;
  };
}

export default function AssistantChatsPage({ Assistants }: Props) {
  const [selectedChat, setSelectedChat] = useState<session_details | null>(null);
  const [selectedAssistant, setSelectedAssistant] =
    useState<AssistantWithSessionDetails | null>(Assistants[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAssistantSelect = (assistantId: string) => {
    const assistant = Assistants.find((a) => a.assistantId === assistantId);
    setSelectedAssistant(assistant || null);
    setSelectedChat(null);
    setMessages([]);
  };

  const handleChatSelect = async (
    assistant: AssistantWithSessionDetails,
    session: session_details
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/session/chat`, {
        params: { sessionId: session.session_id },
      });
      setMessages(response.data);
      setSelectedAssistant(assistant);
      setSelectedChat(session);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-8 h-[calc(100vh-14rem)]">
      <h1 className="text-3xl font-bold mb-8">Your Assistant Chats</h1>
      <div className="text-black mb-4">
        <Select
          onValueChange={handleAssistantSelect}
          value={selectedAssistant?.assistantId || Assistants[0].assistantId}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select an assistant" />
          </SelectTrigger>
          <SelectContent>
            {Assistants.map((assistant) => (
              <SelectItem
                key={assistant.assistantId}
                value={assistant.assistantId}
              >
                {assistant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-8 h-full">
        <div className="w-2/5 overflow-auto">
          <ScrollArea className="h-full">
            {selectedAssistant && (
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center space-x-4">
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
                      <CardTitle>{selectedAssistant.name}</CardTitle>
                      <CardDescription>
                        {selectedAssistant.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {selectedAssistant.session_details.map((session) => (
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
                            onClick={() =>
                              handleChatSelect(selectedAssistant, session)
                            }
                            className="w-full"
                          >
                            View Chat
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </ScrollArea>
        </div>
        <div className="w-3/5">
          <Card className="h-full flex flex-col">
            {selectedChat ? (
              <>
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={selectedAssistant?.avatarUrl}
                          alt={selectedAssistant?.name}
                        />
                        <AvatarFallback>
                          {selectedAssistant?.name.charAt(0)}
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
                      onClick={() => setSelectedChat(null)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close chat</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                  <ScrollArea className="h-full w-full">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2 text-lg">
                          Loading messages...
                        </span>
                      </div>
                    ) : (
                      messages.map((messageObj) => (
                        <div
                          key={messageObj.id}
                          className={`flex items-start space-x-2 mb-4 ${messageObj.message.type === "ai"
                            ? "justify-start"
                            : "justify-end"
                            }`}
                        >
                          {messageObj.message.type === "ai" && (
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
                            className={`rounded-lg p-3 max-w-[70%] ${messageObj.message.type === "ai"
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
                      ))
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
