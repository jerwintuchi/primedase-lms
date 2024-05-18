/* // /api/webhook.ts
import { clerkClient } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { WebhookRequiredHeaders, Webhook } from "svix";

type EmailAddress = { email_address: string };

type ClerkWebhookPayload = {
  data: {
    id: string;
    email_addresses: EmailAddress[];
    profile_image_url: string;
    username: string;
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.WEBHOOK_SECRET;

  // Parse headers and body from webhook request
  const headers: WebhookRequiredHeaders = {
    "svix-id": req.headers["svix-id"] as string,
    "svix-timestamp": req.headers["svix-timestamp"] as string,
    "svix-signature": req.headers["svix-signature"] as string,
  };
  const body = JSON.stringify(req.body);
  const wh = new Webhook(secret as string);

  // Throws on error, returns the verified content on success
  const payload = wh.verify(body, headers) as ClerkWebhookPayload;

  // Update user metadata (assign role: "student" or "teacher")
  if (req && req.url) {
    const role = req.url.includes("/teacher") ? "teacher" : "student";
    const params = {
      publicMetadata: {
        role,
      },
    };
    await clerkClient.users.updateUser(payload?.data.id, params);
    return res.status(200).json({ res: "User metadata updated" });
    } 
  else {
    return res.status(400).json({ res: "User metadata not updated" });
  }

  
};

export default handler; */
