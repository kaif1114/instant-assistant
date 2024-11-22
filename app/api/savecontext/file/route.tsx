import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.getAll("file");

  if (file[0] && file[0] instanceof File) {
    const index = file[0].name.indexOf(".");
    const fileType = file[0].name.substring(index + 1);

    console.log(fileType);
    switch (fileType) {
      case "pdf":
        const pdfLoader = new PDFLoader(file[0]);
        try {
          const docs = await pdfLoader.load();
          return NextResponse.json(docs, { status: 200 });
        } catch (error) {
          console.error(error);
          return NextResponse.json(error, { status: 500 });
        }
      case "docx":
        const docxLoader = new DocxLoader(file[0]);
        try {
          const docs = await docxLoader.load();
          return NextResponse.json(docs, { status: 200 });
        } catch (error) {
          console.error(error);
          return NextResponse.json(error, { status: 500 });
        }
      default:
        console.log(file[0]);
        return NextResponse.json(
          { message: "understandable" },
          { status: 500 }
        );
    }
  }
}
