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
  id: z.string().optional(),
  pageContent: z.string(),
  metadata: MetadataSchema,
});

const SelectedWebsiteSchema = z.object({
  source: z.string(),
  type: z.string(),
  assistantId: z.string(),
  characterCount: z.number(),

});

export const SelectedWebsitesRequestSchema = z.object({
  assistantId: z.string(),
  websites: z.array(SelectedWebsiteSchema),
});

export const SaveContextSchema = z.object({
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
  charactersUsed: z.number().optional(),
});

export const AssistantUpdateSchema = z
  .object({
    id: z.number(),
    userId: z.string(),
    assistantId: z.string(),
    avatarUrl: z.string().url(),
    assistantsCreated: z.number(),
    name: z.string().min(1),
    description: z.string(),
    functionality: z.string(),
    primaryColor: z.string(),
    startingMessage: z.string(),
    Status: z.string(),
    Type: z.string(),
    secondaryColor: z.string(),
  })
  .strict({ message: "Unrecognized data field provided" })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for patch request",
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
  charactersUsed: number;
}

export interface pdfLoaderDocument {
  pageContent: string;
  metadata: {
    source: string;
    blobType: string;
    pdf: Record<string, unknown>;
    loc: {
      pageNumber?: number;
      lineNumber?: number;
      [key: string]: unknown;
    };
  };
  id?: string | number;
}

export type AssistantWithSessionDetails = Prisma.AssistantsGetPayload<{
  include: { session_details: true };
}>;

export interface SelectedFile {
  file: File;
  characterCount: number;
  name?: string;
}

export interface SelectedWebsite {
  url: string;
  characterCount?: number;

}

export interface Document {

  pageContent: string;
  metadata: {
    title: string;
    description: string;
    [key: string]: string | undefined;
  };
}

const DocumentMetadataSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
}).catchall(z.unknown());

export const DocumentSchema = z.object({
  pageContent: z.string(),
  metadata: DocumentMetadataSchema,
});

export const saveWebsiteContextRequestSchema = z.object({
  assistantId: z.string(),
  documents: z.array(z.object({
    pageContent: z.string(),
    metadata: DocumentMetadataSchema,
  }))
});

export interface IOtherSource {
  source: string;
  type: "url" | "file";
  id: string;
  new?: boolean;
  file?: globalThis.File
}
export interface ITextFieldsData {
  id: string;
  text: string;
  description: string;
  title: string;
  new?: boolean;

}
export interface Data {
  textFieldsData: ITextFieldsData[];
  otherSources: IOtherSource[];
  characterCount: {
    charactersUsed: number;
  };
}

export const DeleteContextSchema = z.object({
  sourceType: z.enum(["files", "urls", "textfields"]),
  assistantId: z.string(),
  source: z.array(z.string())
});

