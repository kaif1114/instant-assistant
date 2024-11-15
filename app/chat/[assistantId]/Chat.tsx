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
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  assistantId: string;
  sessionId: string;
  assistant: Assistants;
}

interface UserDetails {
  name: string;
  email: string;
}

export default function Chat({ assistantId, sessionId, assistant }: Props) {
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(
    null
  );
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState<
    Array<{ sender: string; text: string }>
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  React.useEffect(() => {
    if (userDetails) {
      setChatHistory([
        {
          sender: "support",
          text: assistant.startingMessage,
        },
      ]);
    }
  }, [userDetails]);

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
          userDetails,
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

  const handleUserDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    if (name && email) {
      setUserDetails({ name, email });
      console.log(sessionId);
      try {
        axios.post("/api/session/create", {
          userName: name,
          userEmail: email,
          sessionId,
        });
      } catch (error) {}
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4 ">
      <div className="relative w-full max-w-2xl ">
        <div
          className={`${
            !userDetails ? "blur-[2px]" : ""
          } transition-all duration-200 `}
        >
          <Card
            className={`rounded-[20px] overflow-hidden shadow-md text-white`}
          >
            <CardHeader
              className="p-4"
              style={{ backgroundColor: assistant.primaryColor }}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={assistant.avatarUrl}
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
                        style={{
                          backgroundColor:
                            msg.sender === "user"
                              ? assistant.primaryColor
                              : assistant.secondaryColor,
                          color: msg.sender === "user" ? "white" : "black",
                        }}
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
                  disabled={!userDetails}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !userDetails}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        {!userDetails && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0  rounded-[20px]" />
            <Card className="w-full max-w-md shadow-xl rounded-2xl relative z-50">
              <CardHeader
                className=" text-white p-4 rounded-t-2xl"
                style={{ backgroundColor: assistant.primaryColor }}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-white text-black">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">AI Assistant</h2>
                    <p className="text-sm text-gray-300">Online</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-semibold">
                  Please provide your details to start the conversation:
                </h3>
                <form onSubmit={handleUserDetailsSubmit} className="space-y-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="h-12 px-4 text-base rounded-xl"
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="h-12 px-4 text-base rounded-xl"
                    required
                  />
                  <Button
                    style={{ backgroundColor: assistant.primaryColor }}
                    type="submit"
                    className="w-full h-12 text-base bg-black hover:bg-gray-900 rounded-xl"
                  >
                    Start Conversation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
