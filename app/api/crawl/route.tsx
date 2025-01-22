import "@mendable/firecrawl-js";
import { FireCrawlLoader } from "@langchain/community/document_loaders/web/firecrawl";
import { NextRequest, NextResponse } from "next/server";

// Function to remove all image links from the content, including consecutive image entries
function removeImageLinks(content: string) {
  // Match Markdown image syntax with multiple or consecutive images ![alt](url)
  content = content.replace(/(?:!\[.*?\]\(.*?\))+|\<img\b[^>]*\>/g, "");
  return content;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.url || !body.mode) {
    return NextResponse.json(
      { error: "No url found in request body" },
      { status: 400 }
    );
  }
  const loader = new FireCrawlLoader({
    url: body.url,
    mode: body.mode,
  });
  const docs = await loader.load();
  console.log("Original docs:", docs); // Debug log

  // Apply the filter to each document's content with explicit index
  const filteredDocs = docs.map((doc, i) => {
    // console.log(`Processing doc ${i}:`, doc); // Debug log
    return {
      ...doc,
      id: `${body.url}-${i}`,
      pageContent: removeImageLinks(doc.pageContent),
    };
  });

  console.log("Filtered docs:", filteredDocs); // Debug log

  return NextResponse.json({ docs: filteredDocs }, { status: 200 });
}
