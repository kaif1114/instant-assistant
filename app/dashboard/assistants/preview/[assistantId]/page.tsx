import Chat from "@/app/chat/[assistantId]/Chat";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/prisma/client";
import { Assistants } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import BackButton from "./BackButton";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const sessionId = uuidv4();

const page = async ({
  params,
}: {
  params: Promise<{ assistantId: string }>;
}) => {
  const { assistantId } = await params;
  let assistant: Assistants | null = null;
  try {
    assistant = await prisma.assistants.findUnique({ where: { assistantId } });
  } catch (error) {}
  if (assistant) {
    return (
      <div className="">
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
                variant={
                  assistant.Status === "active" ? "default" : "secondary"
                }
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
};

export default page;
