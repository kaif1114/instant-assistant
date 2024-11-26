"use client";

import * as React from "react";
import { ArrowLeft, Send } from "lucide-react";
import axios from "axios";
import { Assistants } from "@prisma/client";
import MarkdownPreview from "@uiw/react-markdown-preview";
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
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  assistantId: string;
  sessionId: string;
  assistant: Assistants;
  embedded?: boolean;
}

interface UserDetails {
  name: string;
  email: string;
}

export default function Chat({
  assistantId,
  sessionId,
  assistant,
  embedded = false,
}: Props) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: string; text: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Small delay to ensure content is rendered
    const scrollToBottom = () => {
      const scrollViewport = document.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    };

    // Immediate scroll
    scrollToBottom();
    // Additional scroll after a small delay to handle dynamic content
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
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
      console.log(sessionId, assistantId, name, email);
      try {
        axios.post("/api/session/create", {
          userName: name,
          userEmail: email,
          session_id: sessionId,
          assistantId,
        });
      } catch (error) {}
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "flex justify-center items-center bg-background",
          embedded ? "w-full h-[100vh]" : "min-h-screen p-4"
        )}
        initial={embedded ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={embedded ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={cn("relative", embedded ? "w-full" : "w-full max-w-2xl")}
        >
          {/* Chat UI - Will be blurred when no user details */}
          <div
            className={cn(
              "flex justify-center items-center transition-all duration-200",
              {
                "h-screen": embedded,
                "blur-[2px]": !userDetails,
              }
            )}
          >
            <Card
              className={cn(
                "flex flex-col rounded-[20px] overflow-hidden shadow-md",
                embedded
                  ? "w-full h-full"
                  : "w-full max-w-md h-[600px] sm:h-[700px]"
              )}
            >
              <CardHeader
                className="flex flex-row items-center gap-4 p-4"
                style={{ backgroundColor: assistant.primaryColor }}
              >
                {!embedded && (
                  <Button variant="ghost" size="icon" className="text-white">
                    <ArrowLeft className="h-6 w-6" />
                  </Button>
                )}
                <h2
                  className={cn(
                    "text-xl font-bold text-white text-center",
                    embedded ? "w-full" : "w-full pr-10"
                  )}
                >
                  {assistant.name}
                </h2>
              </CardHeader>

              <CardContent className="flex-grow p-0 overflow-hidden h-full">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4" ref={scrollAreaRef}>
                    <div className="flex flex-col items-center text-center mb-6">
                      <Avatar className="w-16 h-16 bg-[#4051b5] rounded-full flex items-center justify-center mb-4">
                        <AvatarImage
                          src={assistant.avatarUrl}
                          alt="Assistant"
                        />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>

                      <p className="text-sm text-gray-600 max-w-[250px]">
                        {assistant.description}
                      </p>
                    </div>
                    {chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.sender === "support" && (
                          <Avatar className="h-8 w-8 mr-2 mt-3">
                            <AvatarImage src={assistant.avatarUrl} alt="Bot" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <MarkdownPreview
                          source={msg.text}
                          className={`max-w-[75%] p-3 rounded-lg `}
                          style={{
                            backgroundColor:
                              msg.sender === "user"
                                ? assistant.primaryColor
                                : assistant.secondaryColor,
                            color: msg.sender === "user" ? "white" : "black",
                          }}
                        />
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <Avatar className="h-8 w-8 mr-2 mt-3">
                          <AvatarImage src={assistant.avatarUrl} alt="Bot" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div
                          className="max-w-[75%] p-3 rounded-lg "
                          style={{
                            backgroundColor: assistant.secondaryColor,
                          }}
                        >
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
                  className="relative w-full flex items-center"
                >
                  <Input
                    focusColor={assistant.primaryColor}
                    autoFocus={true}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full rounded-full pr-12 pl-4 shadow-sm" // Increased padding-right for button space, added padding-left for aesthetics
                    style={{ paddingRight: "4rem" }} // Extra padding to avoid text overlap
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !userDetails}
                    className="w-8 h-8 absolute right-1 top-1/2 transform -translate-y-1/2 text-white rounded-full"
                    style={{ backgroundColor: assistant.primaryColor }}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          {/* Single User Details Form - Shown as overlay when no user details */}
          {!userDetails && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="w-96 max-w-md shadow-xl rounded-2xl relative z-50">
                <CardHeader
                  className="text-white p-4 rounded-t-2xl"
                  style={{ backgroundColor: assistant.primaryColor }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-white text-black">
                      <AvatarImage
                        src={assistant.avatarUrl}
                        alt="Assistant Avatar"
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {assistant.name}
                      </h2>
                      <p className="text-sm text-gray-300">Online</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-semibold">
                    Please provide your details to start the conversation:
                  </h3>
                  <form
                    onSubmit={handleUserDetailsSubmit}
                    className="space-y-4"
                  >
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
                      className="w-full h-12 text-base rounded-xl"
                    >
                      Start Conversation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
