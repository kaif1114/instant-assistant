import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.getAll("file");

  if (file[0]) {
    const loader = new PDFLoader(file[0]);
    try {
      const docs = await loader.load();

      return NextResponse.json(docs, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(error, { status: 500 });
    }
  }
}
