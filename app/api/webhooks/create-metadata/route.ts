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
      privateMetadata?: Record<string, any>;
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

  const { id, publicMetadata, privateMetadata } = evt.data;
  const defaultrole = publicMetadata?.role || "student"; // Default role to 'student'
  const teacherrole = privateMetadata?.role || "teacher"; // Default role to 'teacher'
  const currentUser = await clerkClient.users.getUser(id);
  //LOGIC FOR FIRST TIME USER CREATION
  if (eventType === "user.created") {
    const updatepublicMetaData = await clerkClient.users.updateUserMetadata(
      id,
      {
        publicMetadata: {
          role: defaultrole, //SET INITIALLY TO STUDENT SINCE DAPAT SA BACKEND LANG MANGYAYARI ANG ASSIGNMENT OF TEACHER/ADMIN ROLE
        },
      }
    );
    console.log(updatepublicMetaData);
  } else if (
    //if user already exists and is not a teacher and is not a student
    id && // meaning the role student is deleted
    currentUser.publicMetadata?.role !== defaultrole &&
    currentUser.privateMetadata?.role !== teacherrole &&
    eventType === "user.updated"
  ) {
    const updateprivateMetaData = await clerkClient.users.updateUserMetadata(
      id,
      {
        publicMetadata: {
          role: defaultrole, //SET ALWAYS TO STUDENT ROLE
        },
      }
    );
    console.log(updateprivateMetaData);
    return NextResponse.json(
      { message: "User with no role has been set back to student" },
      { status: 200 }
    );
  } else if (
    id &&
    currentUser.publicMetadata?.role !== defaultrole &&
    currentUser.privateMetadata?.role === teacherrole &&
    eventType === "user.updated"
  ) {
    await prisma.user.update({
      where: { clerkId: id },
      data: {
        role: "teacher",
      },
    });

    return NextResponse.json(
      { message: "User isn't student so it has been set to teacher" },
      { status: 200 }
    );
  }

  if (eventType === "user.created") {
    // FOR CLERK DB
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        clerkAttributes: {
          publicMetadata: {
            role: defaultrole,
          },
        },
      }, // FOR MY OWN POSTGRESQL DB
      create: {
        clerkId: id,
        role: defaultrole,
        clerkAttributes: {
          ...publicMetadata,
          role: defaultrole,
        },
      },
    });

    return NextResponse.json(
      { message: "User created in Postgresql db" },
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
