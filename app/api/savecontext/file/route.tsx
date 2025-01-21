import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { Document } from "@langchain/core/documents";
import { vectorStore } from "@/app/pinecone-config";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.getAll("file");

  const assistantId = formData.get("assistantId");

  if (assistantId && file[0] && file[0] instanceof File) {
    const index = file[0].name.indexOf(".");
    const fileType = file[0].name.substring(index + 1);
    const fileName = file[0].name;
    console.log(fileName);

    const Documents: Document[] = [];
    const ids: string[] = [];
    try {
      switch (fileType) {
        case "pdf":
          const pdfLoader = new PDFLoader(file[0]);

          const pdfDocs = await pdfLoader.load();
          pdfDocs.forEach((doc, index) => {
            Documents.push({
              pageContent: doc.pageContent,

              metadata: {
                title: fileName,
                description: "Uploaded file content",
              },
            });
            ids.push(`${fileName}-${index}`);
          });
          console.log(Documents);

          break;

        case "docx":
          const docxLoader = new DocxLoader(file[0]);

          const wordDocs = await docxLoader.load();
          wordDocs.forEach((doc, index) => {
            Documents.push({
              pageContent: doc.pageContent,

              metadata: {
                title: fileName,
                description: "Uploaded file content",
              },
            });
            ids.push(`${fileName}-${index}`);
          });
          console.log(Documents);

          break;

        default:
          console.log(file[0]);
          return NextResponse.json(
            { message: "File type not supported" },
            { status: 500 }
          );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Error processing file" },
        { status: 500 }
      );
    }
    try {
      await vectorStore.addDocuments(Documents, {
        namespace: assistantId as string,
        ids,
      });

      await prisma.knowledgeSource.create({
        data: {
          assistantId: assistantId as string,
          source: fileName,
          type: "file",
        },
      });
      return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Error saving file" },
        { status: 500 }
      );
    }
  }
}
