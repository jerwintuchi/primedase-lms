import { NextApiRequest, NextApiResponse } from 'next';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { IncomingHttpHeaders, request } from 'http';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';

const prisma = new PrismaClient();
// Replace with your Clerk webhook secret from environment variables
const webhookSecret = process.env.WEBHOOK_ASSIGNROLE || '';

async function handler(request: NextApiRequest) {
  // Ensure you have the latest `next` and `@types/next` versions

  const payload = await request.body;
  const headersList = headers();
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };

  // Initialize the Webhook library with your secret
  const wh = new Webhook(webhookSecret);

  // Define the expected Clerk event types
  type EventType = 'user.created' | 'user.updated' | 'user.deleted';

  // Define the Clerk event structure
  interface ClerkEvent {
    data: {
      id: string;
      privateMetadata?: Record<string, any>; // User's private metadata
    };
    object: 'event';
    type: EventType;
  }

  let evt: ClerkEvent | null = null;

  try {
    // Verify the webhook signature for security
    evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as ClerkEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, privateMetadata } = evt.data;
    if (id === undefined) {
      return NextResponse.json({ message: 'Invalid event data' }, { status: 400 });
    }

    // **Determine role based on request URL path:**
    let role = '';
    if (request.url) {
      const url = new URL(request.url);
      const pathname = url.pathname;
      if (pathname === '/teacher-sign-up') {
        role = 'teacher';
      } else if (pathname === '/student-sign-up') {
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

    // Handle user creation or update logic with role assignment
    await updateOrCreateUserInDb(id, role, privateMetadata);

    return NextResponse.json({ message: 'User created or updated' }, { status: 200 });
  } else if (eventType === 'user.deleted') {
    const { id } = evt.data;
    if (id === undefined) {
      return NextResponse.json({ message: 'Invalid event data' }, { status: 400 });
    }

    await deleteUserInDb(id);

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Unhandled event type' }, { status: 400 });
}
// Function to update or create user in your database (replace with your implementation)
async function updateOrCreateUserInDb(id: string, role: string, privateMetadata?: Record<string, any>) {

  // Upsert the user in Prisma database with role and private metadata
  await prisma.user.upsert({
    where: { clerkId: id },
    update: {
      clerkAttributes: {
        privateMetadata: {
          ...privateMetadata,
          role, // Add the assigned role
        },
      },
    },
    create: {
      clerkId: id,
      role,
      clerkAttributes: {
        ...privateMetadata,
        role,
      },
    },
  });
}

// Function to delete user in your database (replace with your implementation)
async function deleteUserInDb(id: string) {

  await prisma.user.delete({
    where: { clerkId: id },
  });
}

export default handler;

export const GET = handler;
export const POST = handler;
export const PUT = handler;