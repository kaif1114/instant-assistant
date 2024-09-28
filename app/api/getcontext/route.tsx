import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const query = searchParams.get("query");
  if (userId && query) {
    return NextResponse.json({ userId, query }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Missing url params" }, { status: 400 });
  }
}
