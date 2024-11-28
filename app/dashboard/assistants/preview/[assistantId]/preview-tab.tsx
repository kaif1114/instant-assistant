"use client";

import Chat from "@/app/chat/[assistantId]/Chat";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assistants } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const sessionId = uuidv4();
export function PreviewTab({ assistantId }: { assistantId: string }) {
  const [assistant, setAssistant] = useState<Assistants | null>(null);

  useEffect(() => {
    async function getAssistantDetails() {
      const response = await axios.get(`/api/assistants/${assistantId}`);
      setAssistant(response.data.assistant);
    }
    getAssistantDetails();
  }, [assistantId]);

  if (!assistant) {
    return <div>Assistant not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{assistant.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p>{assistant.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Functionality:</h3>
            <p>{assistant.functionality}</p>
          </div>
          <div>
            <h3 className="font-semibold">Type:</h3>
            <p>{assistant.Type}</p>
          </div>
          <div>
            <h3 className="font-semibold">Starting Message:</h3>
            <p>{assistant.startingMessage}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status:</h3>
            <Badge
              variant={assistant.Status === "active" ? "default" : "secondary"}
            >
              {assistant.Status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Chat
        assistantId={assistant.assistantId}
        sessionId={sessionId}
        assistant={assistant}
      />
    </div>
  );
}
