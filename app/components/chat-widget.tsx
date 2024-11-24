"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const messages = [
  { id: 1, text: "Hello! How can I assist you today?", sender: "ai" },
  { id: 2, text: "I need help with product documentation.", sender: "user" },
  {
    id: 3,
    text: "I can help you create product documentation efficiently. What specific aspect of documentation do you need assistance with?",
    sender: "ai",
  },
  {
    id: 4,
    text: "I need to create a user guide for our new software.",
    sender: "user",
  },
  {
    id: 5,
    text: "Great! I can help you create a comprehensive user guide. Here are some steps to get started:\n\n1. Outline the main features of your software\n2. Create a table of contents\n3. Write clear, step-by-step instructions for each feature\n4. Include screenshots or diagrams where necessary\n5. Add troubleshooting tips and FAQs\n\nWould you like me to help you with any specific part of this process?",
    sender: "ai",
  },
  { id: 6, text: "Thank you! This is very helpful.", sender: "user" },
  {
    id: 7,
    text: "You're welcome! I'm glad I could help. If you need any further assistance or have more questions, feel free to ask. Good luck with creating your user guide!",
    sender: "ai",
  },
];

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isOpen && currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, messages[currentMessageIndex]]);
        setCurrentMessageIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentMessageIndex]);

  return (
    <div className="relative">
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-black text-white hover:bg-gray-800"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-96 h-[600px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <div className="bg-gray-100 p-4 flex justify-between items-center">
              <h3 className="font-semibold">Chat Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {visibleMessages.map((message) => (
                <div
                  key={message.id}
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
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button type="submit">Send</Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatWidget;
