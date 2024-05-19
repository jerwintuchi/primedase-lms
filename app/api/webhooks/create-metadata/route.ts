import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';
import { IncomingHttpHeaders } from 'http';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const payload = req.body;
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(process.env.SVIX_WEBHOOK_SECRET!);

  type EventType = 'user.created' | 'user.updated'; // Define other event types if necessary

  interface Event {
    data: {
      id: string;
      email_addresses: { email_address: string }[];
      public_metadata: Record<string, any>;
      private_metadata?: Record<string, any>; // Add other fields as needed
    };
    object: 'event';
    type: EventType;
  }

  let evt: Event | null = null;

  try {
    evt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return res.status(400).json({ message: 'Invalid webhook signature' });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, public_metadata, private_metadata } = evt.data;
    const email = email_addresses[0].email_address;
    const role = public_metadata?.role || 'student'; // Default role to 'student'

    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        role: role,
        clerkAttributes: {
          ...public_metadata,
          role: role,
        },
        // Add private metadata if needed
      },
      create: {
        clerkId: id,
        role: role,
        clerkAttributes: {
          ...public_metadata,
          role: role,
        },
        // Add private metadata if needed
      },
    });

    return res.status(200).json({ message: 'User created or updated' });
  }

  return res.status(400).json({ message: 'Unhandled event type' });
}
