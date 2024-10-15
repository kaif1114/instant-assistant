"use client";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Assistants } from "@prisma/client";
import axios from "axios";

interface Props {
  assistantId: string;
  sessionId: string;
  assistant: Assistants;
}

const Chat = ({ assistantId, sessionId, assistant }: Props) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "support", text: "Hey! How can we help you today?" },
  ]);

  async function sendMessage() {
    if (message.trim()) {
      try {
        const updatedHistory = [
          ...chatHistory,
          { sender: "user", text: message },
        ];
        setChatHistory(updatedHistory);

        const response = await axios.post("/api/ask", {
          question: message,
          assistantId,
          sessionId,
        });

        setChatHistory([
          ...updatedHistory,
          { sender: "support", text: response.data.message },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // useEffect(() => {
  //   console.log("inside");
  //   async function getAssistantDetails() {
  //     try {
  //       const response = await axios.get(`/api/assistants/${assistantId}`);
  //       console.log("response", response);
  //       if (!response) {
  //         console.log("not found");
  //         notFound();
  //       }
  //       console.log("found");
  //       setAssistant(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   getAssistantDetails();
  // }, [assistantId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0A0A15] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#478ACD] p-4 text-white">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar 1"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar 2"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <h2 className="font-bold">{assistant?.name}</h2>
              <p className="text-sm opacity-80">{assistant?.description}</p>
            </div>
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="h-96 overflow-y-auto p-4 space-y-4"
          id="chat"
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-[#478ACD] text-white"
                    : "bg-gray-100 text-[#0A0A15]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#478ACD]"
            />
            <button
              onClick={sendMessage}
              className="bg-[#478ACD] text-white p-2 rounded-md hover:bg-[#3a7ab8] transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
