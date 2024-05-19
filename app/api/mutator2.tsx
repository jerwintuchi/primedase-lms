import { NextApiRequest, NextApiResponse } from "next";
import { clerkClient } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!req || !req.url) {
    throw new Error("Invalid request");
  }

  try {
    const userData = req.body; // Access text data directly
    const role = req.url.startsWith("/teacher-sign-up/") ? "teacher" : "student";

    const user = await clerkClient.users.createUser({
      ...userData,
      privateMetadata: { role },
    });

    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
}
