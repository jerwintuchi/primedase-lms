import { clerkClient } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import toast from "react-hot-toast";

export async function createUserWithRole(req: NextApiRequest, userData: any, role: String) {
    if (!req || !req.url) {
      throw new Error('Invalid request');
    }
  
    const route = req.url.startsWith("/teacher-sign-up/") ? 
    "teacher" : "student";
      try {
      const user = await clerkClient.users.createUser({
        ...userData, // Spread user data from your form or component
        privateMetadata: { 
          role
         }, 
      });
      toast.success("Registered Successfully!", user);
      // Handle successful user creation (e.g., redirect to dashboard)
    } catch (error) {
      toast.error("Error creating user:");
      // Handle any errors during user creation (e.g., display error message)
    }
  }