"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Assistants } from "@prisma/client";
import MarkdownPreview from "@uiw/react-markdown-preview";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { Input as Input2 } from "@/components/ui/input";
import { TypingIndicator } from "./TypingIndicator";

interface Props {
  assistantId: string;
  sessionId: string;
  assistant: Assistants;
  embedded?: boolean;
}

interface UserDetails {
  name?: string;
  email?: string;
}

interface Message {
  sender: "user" | "support";
  text: string;
  type?: "text" | "input";
  inputType?: "name" | "email";
}

export default function Chat({
  assistantId,
  sessionId,
  assistant,
  embedded = false,
}: Props) {
  const [userDetails, setUserDetails] = useState<UserDetails>({});
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextStep, setnextStep] = useState<
    "init" | "askName" | "askEmail" | "chat"
  >("init");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nextStep === "init") {
      addTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        sendSystemMessage({
          sender: "support",
          text: "Hello! To get started, I would need your name and email.",
          type: "text",
        });
        setnextStep("askName");
      }, 1500);
    } else if (nextStep == "askName") {
      addTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        sendSystemMessage({
          sender: "support",
          text: "Please enter your name below.",
          type: "input",
          inputType: "name",
        });
      }, 3500);
    }
  }, [nextStep]);

  useEffect(() => {
    const scrollToBottom = () => {
      const scrollViewport = document.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    };

    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [chatHistory]);

  const addTypingIndicator = () => {
    setIsLoading(true);
  };

  const removeTypingIndicator = () => {
    setIsLoading(false);
  };

  const sendSystemMessage = (message: Message) => {
    setChatHistory((prev) => [...prev, message]);
  };

  const handleInputSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    inputType: "name" | "email"
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get(inputType) as string;

    if (inputValue) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "user", text: inputValue, type: "text" },
      ]);

      addTypingIndicator();

      setTimeout(async () => {
        removeTypingIndicator();
        if (inputType === "name") {
          setUserDetails((prev) => ({ ...prev, name: inputValue }));
          sendSystemMessage({
            sender: "support",
            text: `Thank you, ${inputValue}! Could you please provide your email address?`,
            type: "input",
            inputType: "email",
          });
          setnextStep("askEmail");
        } else if (inputType === "email") {
          setUserDetails((prev) => ({ ...prev, email: inputValue }));
          sendSystemMessage({
            sender: "support",
            text: "Thank you! We have your details. How can I assist you today?",
            type: "text",
          });
          setnextStep("chat");

          // Optionally, send the user details to your backend
          try {
            await axios.post("/api/session/create", {
              userName: userDetails.name || "",
              userEmail: inputValue,
              session_id: sessionId,
              assistantId,
            });
          } catch (error) {
            console.error(error);
          }
        }
      }, 1500);
    }
  };

  async function sendMessage() {
    if (message.trim() && nextStep === "chat") {
      try {
        setIsLoading(true);
        const updatedHistory: Message[] = [
          ...chatHistory,
          { sender: "user", text: message, type: "text" },
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
          { sender: "support", text: response.data.message, type: "text" },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

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
          {/* Chat UI */}
          <div
            className={cn(
              "flex justify-center items-center transition-all duration-200",
              {
                "h-screen": embedded,
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
                        } mb-2 items-end`}
                      >
                        {msg.sender === "support" && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={assistant.avatarUrl} alt="Bot" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        {msg.type === "text" && (
                          <MarkdownPreview
                            source={msg.text}
                            className={`max-w-[75%] py-2 px-3 rounded-2xl ${
                              msg.sender === "user"
                                ? "rounded-br-sm"
                                : "rounded-bl-sm"
                            }`}
                            style={{
                              backgroundColor:
                                msg.sender === "user"
                                  ? assistant.primaryColor
                                  : "rgb(243, 243, 243)",
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
                          />
                        )}
                        {msg.type === "input" && msg.sender === "support" && (
                          <div
                            className={`max-w-[75%] py-2 px-3 rounded-2xl rounded-bl-sm`}
                            style={{
                              backgroundColor: "rgb(243, 243, 243)",
                              border: "1px solid rgb(229, 229, 229)",
                              fontSize: "15px",
                            }}
                          >
                            <p style={{ fontSize: "15px" }}>{msg.text}</p>
                            <form
                              onSubmit={(e) =>
                                handleInputSubmit(e, msg.inputType!)
                              }
                              className="mt-2 relative"
                            >
                              <Input2
                                type="text"
                                name={msg.inputType}
                                placeholder={
                                  msg.inputType === "name"
                                    ? "Your Name"
                                    : "Your Email"
                                }
                                required
                                className="w-full rounded-full pr-12 pl-4"
                              />
                              <Button
                                type="submit"
                                size="icon"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full text-white"
                                style={{
                                  backgroundColor: assistant.primaryColor,
                                }}
                              >
                                <Send className="h-5 w-5" />
                                <span className="sr-only">Submit</span>
                              </Button>
                            </form>
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start mb-2 items-end">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={assistant.avatarUrl} alt="Bot" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div
                          className="max-w-[75%] py-2 px-3 rounded-2xl rounded-bl-sm"
                          style={{
                            backgroundColor: "rgb(243, 243, 243)",
                            border: "1px solid rgb(229, 229, 229)",
                            fontSize: "15px",
                          }}
                        >
                          <TypingIndicator />
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
                    className="w-full rounded-full pr-12 pl-4 shadow-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || nextStep !== "chat"}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 text-white rounded-full"
                    style={{ backgroundColor: assistant.primaryColor }}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          {/* Removed Overlay Form */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
