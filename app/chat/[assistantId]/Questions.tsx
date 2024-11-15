"use client";

import * as React from "react";
import { Send } from "lucide-react";
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

interface Props {
  assistant: Assistants;
  onSubmit: (name: string, email: string) => void;
}

export default function Questions({ assistant, onSubmit }: Props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onSubmit(name, email);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-2xl rounded-xl overflow-hidden shadow-md">
        <CardHeader
          className="p-4"
          style={{ backgroundColor: assistant.primaryColor }}
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={assistant.avatarUrl} alt="Assistant Avatar" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{assistant?.name}</h2>
              <p className="text-sm opacity-80">{assistant?.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="mb-4">
            Please provide your details to start the conversation:
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
          </form>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!name || !email}
          >
            Start Conversation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
