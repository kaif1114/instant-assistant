import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const payload = JSON.stringify(body);
  const headersPayload = headers();

  const svixId = headersPayload.get("svix-id");
  const svixTimestamp = headersPayload.get("svix-timestamp");
  const svixSignature = headersPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "No svix headers" }, { status: 400 });
  }

  const secret = process.env.CLERK_WEBHOOK_SECRET;

  const wh = new Webhook(secret!);
  let event: WebhookEvent;
  try {
    event = wh.verify(payload, {
      "svix-id": svixId!,
      "svix-timestamp": svixTimestamp!,
      "svix-signature": svixSignature!,
    }) as WebhookEvent;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Could not verify svix headers" },
      { status: 400 }
    );
  }

  console.log(event);

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
