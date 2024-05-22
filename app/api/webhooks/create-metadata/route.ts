import { PrismaClient } from "@prisma/client";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

const prisma = new PrismaClient();
const webhookSecret = process.env.WEBHOOK_METADATA || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);

  type EventType = "user.created" | "user.updated" | "user.deleted";

  interface ClerkEvent {
    data: {
      id: string;
      publicMetadata?: Record<string, any>;
    };
    object: "event";
    type: EventType;
  }

  let evt: ClerkEvent | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as ClerkEvent;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType = evt.type;

  const { id, publicMetadata } = evt.data;
  const role = publicMetadata?.role || "student"; // Default role to 'student'

  //LOGIC FOR FIRST TIME USER CREATION
  if (eventType === "user.created") {
    const updateMetaData = await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        role: role, //SET INITIALLY TO STUDENT SINCE DAPAT SA BACKEND LANG MANGYAYARI ANG ASSIGNMENT OF TEACHER/ADMIN ROLE
      },
    });
    console.log(updateMetaData);
  }

  if (eventType === "user.created" || eventType === "user.updated") {
    // FOR CLERK DB
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        clerkAttributes: {
          publicMetadata: {
            role: role,
          },
        },
      }, // FOR MY OWN POSTGRESQL DB
      create: {
        clerkId: id,
        role: role,
        clerkAttributes: {
          ...publicMetadata,
          role: role,
        },
      },
    });

    return NextResponse.json(
      { message: "User created or updated" },
      { status: 200 }
    );
  } else if (eventType === "user.deleted") {
    await prisma.user.delete({
      where: { clerkId: evt.data.id },
    });

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Unhandled event type" },
    { status: 400 }
  );
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
