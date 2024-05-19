import { PrismaClient } from '@prisma/client';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export default async function handler(request : Request) {

  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(process.env.WEBHOOK_SECRET2!);

let evt: Event | null = null;


try {
    evt = wh.verify(
    JSON.stringify(payload), 
    heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event;
 } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({}, {status: 400})
 }   

const eventType: EventType = evt.type;
if (eventType === "user.created" || eventType === "user.updated" || eventType === "*") {
    const {id, ...clerkAttributes} = evt.data;
    console.log(id);
    console.log(clerkAttributes);  // from the User model
    return NextResponse.json({}, {status: 200})
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
    data: Record<string, string | number>,
    object: "event",
    type: EventType,
    };
  
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;

