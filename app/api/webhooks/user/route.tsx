import prisma from "@/prisma/client";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const payload = JSON.stringify(body);
  const headersPayload = headers();

  const svixId = (await headersPayload).get("svix-id");
  const svixTimestamp = (await headersPayload).get("svix-timestamp");
  const svixSignature = (await headersPayload).get("svix-signature");

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

  if (event.type === "user.created") {
    try {
      const user = await prisma.user.create({
        data: {
          email: event.data.email_addresses[0].email_address,
          firstName: event.data.first_name!,
          lastName: event.data.last_name!,
          emailVerification:
            event.data.email_addresses[0].verification?.status!,
          imageUrl: event.data.image_url,
          userId: event.data.id,
        },
      });
      return NextResponse.json(
        { message: `User created with id ${user.userId}` },
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { Error: "Failed to add user to database" },
        { status: 500 }
      );
    }
  } else if (event.type === "user.updated") {
    try {
      const user = await prisma.user.update({
        where: { userId: event.data.id },
        data: {
          email: event.data.email_addresses[0].email_address,
          firstName: event.data.first_name!,
          lastName: event.data.last_name!,
          emailVerification:
            event.data.email_addresses[0].verification?.status!,
          imageUrl: event.data.image_url,
          userId: event.data.id,
        },
      });
      return NextResponse.json(
        { message: `User with id ${user.userId} updated` },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { Error: "Failed to update user in database" },
        { status: 500 }
      );
    }
  } else if (event.type === "user.deleted") {
    try {
      const user = await prisma.user.delete({
        where: { userId: event.data.id },
      });
      return NextResponse.json(
        { message: `User with id ${user.userId} deleted` },
        { status: 202 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "failed to delete user" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
