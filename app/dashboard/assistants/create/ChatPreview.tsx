import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

interface Props {
  name: string;
  description: string;
  startingMessage: string;
  avatarUrl: string;
  primaryColor: string | undefined;
  secondaryColor: string | undefined;
}

const ChatPreview = ({
  name,
  description,
  startingMessage,
  avatarUrl,
  primaryColor,
  secondaryColor,
}: Props) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "assistant",
      text: startingMessage || "Hey! How can I help you today?",
    },
  ]);

  useEffect(() => {
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
    <Card className="w-full h-full rounded-xl overflow-hidden shadow-lg flex flex-col">
      <CardHeader className="p-4" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt="Assistant Avatar" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-white">
              {name || "AI Assistant"}
            </h2>
            <p className="text-sm text-white opacity-80">
              {description || "Your personal AI assistant"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="space-y-4 p-4">
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
                      msg.sender === "user" ? primaryColor : secondaryColor,
                    color: msg.sender === "user" ? "white" : "black",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <form
          onSubmit={sendMessage}
          className="flex items-center space-x-2 w-full"
        >
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatPreview;
