import { z } from "zod";
import {
  AssistantType,
  DataFieldEntry,
} from "./dashboard/assistants/create/AssistantTraining";
import { Prisma } from "@prisma/client";

const MetadataSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .catchall(z.any());

const DocumentsSchema = z.object({
  pageContent: z.string(),
  metadata: MetadataSchema,
});

export const RequestBodySchema = z.object({
  assistantId: z.string(),
  documents: z.array(DocumentsSchema),
});

export const AskRequestSchema = z.object({
  sessionId: z.string(),
  assistantId: z.string(),
  question: z.string(),
});

export const CreateAssistantRequestSchema = z.object({
  assistantId: z.string(),
  name: z.string(),
  assistantType: z.string(),
  functionality: z.string(),
  description: z.string(),
  userId: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  avatarUrl: z.string(),
});

export interface NewAssistantData {
  name: string;
  description: string;
  functionality: string;
  assistantType: AssistantType;
  customType: string;
  dataFields: DataFieldEntry[];
  startingMessage: string;
  primaryColor: string;
  secondaryColor: string;
  avatarUrl: string;
}

export type AssistantWithSessionDetails = Prisma.AssistantsGetPayload<{
  include: { session_details: true };
}>;
