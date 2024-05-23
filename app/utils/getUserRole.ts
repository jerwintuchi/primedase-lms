import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

async function getUserRole(
  userId: string
): Promise<"student" | "teacher" | null> {
  try {
    // Fetch complete user information including private metadata
    const user = await clerkClient.users.getUser(userId);

    // Check for teacher role in private metadata (highest priority)
    if (user.privateMetadata?.role === "teacher") {
      return "teacher";
    }

    // Check for student role in public metadata (fallback)
    if (user.publicMetadata?.role === "student") {
      return "student";
    }

    // User doesn't have a recognized role (probably not likely to happen since default role is student)
    //and since when the student role is manually deleted by accident it will be automatically set to student again
    return null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null; // Handle potential errors gracefully
  }
}

export default getUserRole;
