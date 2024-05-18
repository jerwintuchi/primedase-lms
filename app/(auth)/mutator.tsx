import { clerkClient } from "@clerk/nextjs/server";
import toast from "react-hot-toast";

export async function createUserWithRole(userData: any, role: String) {
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
