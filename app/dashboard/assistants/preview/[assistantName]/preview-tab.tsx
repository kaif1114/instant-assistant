"use client";

import Chat from "@/app/chat/[assistantId]/Chat";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assistants } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { useSelectedAssistantStore } from "../store";

const sessionId = uuidv4();
export function PreviewTab() {
  const { selectedAssistant, setSelectedAssistant } =
    useSelectedAssistantStore();
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{selectedAssistant?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p>{selectedAssistant?.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Functionality:</h3>
            <p>{selectedAssistant?.functionality}</p>
          </div>
          <div>
            <h3 className="font-semibold">Type:</h3>
            <p>{selectedAssistant?.Type}</p>
          </div>
          <div>
            <h3 className="font-semibold">Starting Message:</h3>
            <p>{selectedAssistant?.startingMessage}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status:</h3>
            <Badge
              variant={
                selectedAssistant?.Status === "active" ? "default" : "secondary"
              }
            >
              {selectedAssistant?.Status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Chat
        assistantId={selectedAssistant!.assistantId}
        sessionId={sessionId}
        assistant={selectedAssistant!}
      />
    </div>
  );
}
