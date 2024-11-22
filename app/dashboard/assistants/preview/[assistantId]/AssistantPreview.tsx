import { useRouter } from "next/navigation";
import BackButton from "./BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chat from "@/app/chat/[assistantId]/Chat";
import { Assistants } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface AssistantPreviewProps {
  assistant: Assistants;
}

export function AssistantPreview({ assistant }: AssistantPreviewProps) {
  useRouter;

  return (
    <div className="space-y-6">
      <BackButton />

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

      {/* <Chat
        assistantId={assistant.assistantId}
        sessionId={sessionId}
        assistant={assistant}
      /> */}
    </div>
  );
}
