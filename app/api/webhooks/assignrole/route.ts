import { PrismaClient } from '@prisma/client';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';
import { IncomingHttpHeaders } from 'http';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const webhookSecret = process.env.WEBHOOK_METADATA || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };

  const wh = new Webhook(webhookSecret);

  type EventType = 'user.created' | 'user.updated' | 'user.deleted';

  interface ClerkEvent {
    data: {
      id: string;
      privateMetadata?: Record<string, any>;
    };
    object: 'event';
    type: EventType;
  }

  let evt: ClerkEvent | null = null;

  try {
    evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as ClerkEvent;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id,  privateMetadata } = evt.data;
    // **Determine role based on request URL path:**
    let role = '';
    if (request.url) {
      const url = new URL(request.url);
      const pathname = url.pathname;
      if (pathname === '/teacher-sign-up') {
        role = 'teacher';
      } else if (pathname === '/sign-up') {
        role = 'student';
      } else {
        console.warn('Unrecognized signup path:', pathname);
        // Handle users signing up from unexpected routes (optional)
        // You can throw an error, assign a default role, or log the warning
      }
    } else {
      console.error('Invalid request URL');
      return NextResponse.json({ message: 'Invalid request URL' }, { status: 400 });
    }
    // FOR CLERK DB
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        clerkAttributes: {
          privateMetadata: {
            "role": role
          }
        },
        
      },  // FOR MY OWN POSTGRESQL DB
      create: {
        clerkId: id,
        role: role,
        clerkAttributes: {
          ...privateMetadata,
          role: role,
        },
        
      },
    });

    return NextResponse.json({ message: 'User created or updated' }, { status: 200 });
  } else if (eventType === 'user.deleted') {
    await prisma.user.delete({
      where: { clerkId: evt.data.id },
    });

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Unhandled event type' }, { status: 400 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;