"use client";

import { Input } from "@/app/chat/[assistantId]/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import * as React from "react";

interface Props {
  name: string;
  description: string;
  startingMessage: string;
  avatarUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function ChatPreview({
  name,
  description,
  startingMessage,
  avatarUrl,
  primaryColor,
  secondaryColor,
}: Props) {
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState([
    {
      sender: "assistant",
      text: startingMessage || "Hey! How can I help you today?",
    },
  ]);

  React.useEffect(() => {
    setChatHistory([
      {
        sender: "assistant",
        text: startingMessage || "Hey! How can I help you today?",
      },
    ]);
  }, [startingMessage]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: "user", text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center bg-background p-4">
      <Card className="w-full max-w-md h-[600px] sm:h-[650px] flex flex-col rounded-[20px] overflow-hidden shadow-md">
        <CardHeader
          className="flex flex-row items-center gap-4 p-4"
          style={{ backgroundColor: primaryColor }}
        >
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-bold text-white text-center w-full pr-10">
            {name || "AI Assistant"}
          </h2>
        </CardHeader>
        <CardContent className="flex-grow p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="w-16 h-16 bg-[#4051b5] rounded-full flex items-center justify-center mb-4">
                  <AvatarImage src={avatarUrl} alt="Assistant" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <p className="text-sm text-gray-600 max-w-[250px]">
                  {description || "Your Personal AI Assistant"}
                </p>
              </div>
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  } mb-2 items-end`}
                >
                  {msg.sender === "assistant" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={avatarUrl} alt="Bot" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] py-2 px-3 rounded-2xl ${
                      msg.sender === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                    }`}
                    style={{
                      backgroundColor:
                        msg.sender === "user"
                          ? primaryColor
                          : secondaryColor || "rgb(243, 243, 243)",
                      color: msg.sender === "user" ? "white" : "black",
                      border:
                        msg.sender === "user"
                          ? "none"
                          : "1px solid rgb(229, 229, 229)",
                      lineHeight: "1.4",
                      fontSize: "15px",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form
            onSubmit={sendMessage}
            className="relative w-full flex items-center"
          >
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-full pr-12 pl-4 shadow-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-white rounded-full"
              style={{ backgroundColor: primaryColor }}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
