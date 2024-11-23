"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";

const messages = [
  {
    text: "Hi! How can I help you today?",
    sender: "ai",
    delay: 0,
  },
  {
    text: "I need help with my account settings",
    sender: "user",
    delay: 2,
  },
  {
    text: "I'll be happy to help you with your account settings. What specific settings would you like to adjust?",
    sender: "ai",
    delay: 4,
  },
];

function ChatPreview() {
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([]);

  useEffect(() => {
    messages.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, message]);
      }, message.delay * 1000);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="chat-preview rounded-2xl overflow-hidden w-full max-w-md mx-auto lg:mx-0"
    >
      <Card className="border-0 shadow-none">
        <CardHeader className="bg-black text-white p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Instant Assistant</h3>
              <p className="text-sm text-gray-300">Online</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4 h-[300px] overflow-y-auto bg-white">
          {visibleMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </CardContent>
        <CardFooter className="p-4 border-t bg-white">
          <div className="relative w-full flex items-center">
            <Input
              placeholder="Type your message..."
              className="pr-12 rounded-full"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-black hover:bg-gray-800"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
export default ChatPreview;
