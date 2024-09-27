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

const RequestBodySchema = z.object({
  userId: z.string(),
  documents: z.array(DocumentsSchema),
});

export default RequestBodySchema;
