"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assistants } from "@prisma/client";
import { useRouter } from "next/navigation";

export function AssistantList({ assistants }: { assistants: Assistants[] }) {
  const router = useRouter();
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assistants.map((assistant) => (
          <Card
            key={assistant.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() =>
              router.push(
                `/dashboard/assistants/preview/${assistant.assistantId}`
              )
            }
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={assistant.avatarUrl} alt={assistant.name} />
                <AvatarFallback>{assistant.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle>{assistant.name}</CardTitle>
                <Badge
                  variant={
                    assistant.Status === "active" ? "default" : "secondary"
                  }
                >
                  {assistant.Status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {assistant.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
