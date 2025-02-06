"use client";

import { Input as ChatInput } from "@/app/chat/[assistantId]/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

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
  const [message, setMessage] = useState("");
  const primaryColor = "#000000";




  return (
<section className="w-full py-20">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  Transform your content workflow
                </h2>
                <p className="text-gray-500 text-lg">
                  Stop spending hours editing videos and writing documentation.
                  Our AI-powered platform handles it all.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-[#E97451]/10 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-[#E97451]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Lightning Fast</h3>
                    <p className="text-gray-500">
                      Generate content in minutes, not hours
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-[#8B7FD3]/10 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-[#8B7FD3]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">AI-Powered</h3>
                    <p className="text-gray-500">
                      Smart content generation and enhancement
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Customizable</h3>
                    <p className="text-gray-500">
                      Tailor content to match your brand
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pl-8 relative h-[600px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-full"
              >
                <div className="chat-preview rounded-[20px] overflow-hidden w-full max-w-md mx-auto lg:mx-0">
      <Card className="w-full h-[700px] flex flex-col rounded-[20px] overflow-hidden shadow-md">
        <CardHeader 
          className="flex flex-row items-center gap-4 p-4"
          style={{ backgroundColor: primaryColor }}
        >
          <h2 className="text-xl font-bold text-white text-center w-full">
            Instant Assistant
          </h2>
        </CardHeader>

        <CardContent className="flex-grow p-0 overflow-hidden">
          <ScrollArea className="h-full">
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

              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 2,
                    duration: 0.5 
                  }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  } mb-2 items-end`}
                >
                  {msg.sender === "ai" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] py-2 px-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "rounded-br-none bg-black text-white"
                        : "rounded-bl-none bg-[#f2f2f2]"
                    }`}
                    style={{
                      border: msg.sender === "user"
                        ? "none"
                        : "1px solid rgb(229, 229, 229)"
                    }}
                  >
                    <MarkdownPreview
                      source={msg.text}
                      style={{
                        backgroundColor: "transparent",
                        color: msg.sender === "user" ? "white" : "black",
                        lineHeight: "1.4",
                        fontSize: "15px",
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 border-t">
          <div className="relative w-full flex items-center">
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
          </div>
        </CardFooter>
      </Card>
    </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



    
  );
}
