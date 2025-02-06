"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Input as ChatInput } from "@/app/chat/[assistantId]/input";

const messages = [
  { id: 1, text: "Hello! How can I assist you today?", sender: "ai", delay: 0 },
  {
    id: 2,
    text: "I need help with product documentation.",
    sender: "user",
    delay: 2,
  },
  {
    id: 3,
    text: "I can help you create product documentation efficiently. What specific aspect of documentation do you need assistance with?",
    sender: "ai",
    delay: 2,
  },
  {
    id: 4,
    text: "I need to create a user guide for our new software.",
    sender: "user",
    delay: 2,
  },
  {
    id: 5,
    text: "Great! I can help you create a comprehensive user guide. Here are some steps to get started:\n\n1. Outline the main features of your software\n2. Create a table of contents\n3. Write clear, step-by-step instructions for each feature\n4. Include screenshots or diagrams where necessary\n5. Add troubleshooting tips and FAQs\n\nWould you like me to help you with any specific part of this process?",
    sender: "ai",
    delay: 2,
  },
  {
    id: 6,
    text: "Thank you! This is very helpful.",
    sender: "user",
    delay: 2,
  },
  {
    id: 7,
    text: "You&apos;re welcome! I&apos;m glad I could help. If you need any further assistance or have more questions, feel free to ask. Good luck with creating your user guide!",
    sender: "ai",
    delay: 2,
  },
];

export function ChatPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const primaryColor = "#000000";

  // Update scroll function to only scroll chat area
  const scrollToBottom = () => {
    const scrollContainer = document.querySelector(
      '[data-radix-scroll-area-viewport]'
    ) as HTMLDivElement;
    
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Only scroll chat area when messages change
  useEffect(() => {
    if (visibleMessages.length > 0) {
      scrollToBottom();
    }
  }, [visibleMessages]);

  // Auto-open chat after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show messages one by one
  useEffect(() => {
    if (isOpen && currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, messages[currentMessageIndex]]);
        setCurrentMessageIndex((prev) => prev + 1);
      }, messages[currentMessageIndex].delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentMessageIndex]);

  return (
    <div className="relative">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-4 right-4"
          >
            <Button
              className="rounded-full w-12 h-12 bg-black text-white hover:bg-gray-800"
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle />
            </Button>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="chat-preview rounded-[20px] overflow-hidden w-full max-w-md mx-auto lg:mx-0"
          >
            <Card className="w-full h-[700px] flex flex-col rounded-[20px] overflow-hidden shadow-md">
              <CardHeader 
                className="flex flex-row items-center gap-4 p-4"
                style={{ backgroundColor: primaryColor }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <h2 className="text-xl font-bold text-white text-center w-full pr-10">
                  Instant Assistant
                </h2>
              </CardHeader>

              <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea ref={scrollAreaRef} className="h-full">
                  <div className="p-4 space-y-4">
                    <div className="flex flex-col items-center text-center mb-6">
                      <Avatar className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                        <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-600 max-w-[250px]">
                        I&apos;m here to help you with your questions and provide assistance.
                      </p>
                    </div>

                    {visibleMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        } mb-2 items-end`}
                      >
                        {message.sender === "ai" && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[75%] py-2 px-3 rounded-2xl ${
                            message.sender === "user"
                              ? "rounded-br-none bg-black text-white"
                              : "rounded-bl-none bg-[#f2f2f2]"
                          }`}
                          style={{
                            border: message.sender === "user"
                              ? "none"
                              : "1px solid rgb(229, 229, 229)"
                          }}
                        >
                          <MarkdownPreview
                            source={message.text}
                            style={{
                              backgroundColor: "transparent",
                              color: message.sender === "user" ? "white" : "black",
                              lineHeight: "1.4",
                              fontSize: "15px",
                              wordBreak: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t">
                <form className="relative w-full flex items-center">
                  <ChatInput
                    focusColor={primaryColor}
                    autoFocus={true}
                    type="text"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full rounded-full pr-12 pl-4 shadow-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 text-white rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
