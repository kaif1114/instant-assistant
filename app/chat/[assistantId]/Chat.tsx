"use client";

import * as React from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { Assistants } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  assistantId: string;
  sessionId: string;
  assistant: Assistants;
}

export default function Chat({ assistantId, sessionId, assistant }: Props) {
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState([
    { sender: "support", text: "Hey! How can we help you today?" },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  async function sendMessage() {
    if (message.trim()) {
      try {
        setIsLoading(true);
        const updatedHistory = [
          ...chatHistory,
          { sender: "user", text: message },
        ];
        setChatHistory(updatedHistory);
        setMessage("");

        const response = await axios.post("/api/ask", {
          question: message,
          assistantId,
          sessionId,
        });

        setChatHistory([
          ...updatedHistory,
          { sender: "support", text: response.data.message },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-2xl rounded-xl overflow-hidden shadow-md">
        <CardHeader className="bg-primary text-primary-foreground p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="Assistant Avatar"
              />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{assistant?.name}</h2>
              <p className="text-sm opacity-80">{assistant?.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[450px] p-4" ref={chatContainerRef}>
            <div className="space-y-4">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] p-3 rounded-lg bg-secondary">
                    <Skeleton className="h-5 w-[200px]" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center space-x-2 w-full"
          >
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
