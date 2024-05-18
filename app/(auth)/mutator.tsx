import { clerkClient } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import router from "next/router";
import toast from "react-hot-toast";

export async function createUserWithRole(
    req: NextApiRequest, 
    userData: any,
    role: "student" | "teacher") {


    if (!req || !req.url) {
      throw new Error('Invalid request');
    }
  
    const role = req.url.startsWith("/teacher-sign-up/") ? "teacher" :
    req.url.startsWith("/sign-up/") ? "student" : null;

      try {
      const user = await clerkClient.users.createUser({
        ...userData, // Spread user data from your form or component
        privateMetadata: { 
          role: `${role}`
         }, 
      });
      toast.success("Registered Successfully!", user);

    } catch (error) {
      toast.error("Error creating user:");
      // Handle any errors during user creation (e.g., display error message)
    }
  }