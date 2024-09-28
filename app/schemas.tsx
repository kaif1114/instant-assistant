import { z } from "zod";

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
