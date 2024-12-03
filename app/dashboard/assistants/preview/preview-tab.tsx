"use client";

import Chat from "@/app/chat/[assistantId]/Chat";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assistants } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const sessionId = uuidv4();
export function PreviewTab({ Assistant }: { Assistant: Assistants }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{Assistant.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p>{Assistant.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Functionality:</h3>
            <p>{Assistant.functionality}</p>
          </div>
          <div>
            <h3 className="font-semibold">Type:</h3>
            <p>{Assistant.Type}</p>
          </div>
          <div>
            <h3 className="font-semibold">Starting Message:</h3>
            <p>{Assistant.startingMessage}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status:</h3>
            <Badge
              variant={Assistant.Status === "active" ? "default" : "secondary"}
            >
              {Assistant.Status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Chat
        assistantId={Assistant.assistantId}
        sessionId={sessionId}
        assistant={Assistant}
      />
    </div>
  );
}
