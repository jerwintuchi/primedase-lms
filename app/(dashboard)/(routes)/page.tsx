import { Roles } from "@/app/types/globals";
import { checkRole } from "@/app/utils/roles";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isTeacher } from "@/lib/teacher"; // Likely not needed here

export default async function TeacherDashBoard(role: Roles) {
  const user = await currentUser();

  if (checkRole("teacher") && user) {
    // Redirect to root for teacher or publicMetadata.role === "teacher"
    return redirect("/");
  } else if (checkRole("student") && user) {
    return redirect("/student");
  }

  if (!user) {
    console.log("UNAUTHORIZED USER", checkRole("student"));
    console.log("UNAUTHORIZED USER", checkRole("teacher"));
    return redirect("/unauthorized");
  }

  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
