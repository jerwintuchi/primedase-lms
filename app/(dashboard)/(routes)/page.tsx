import { Roles } from "@/app/types/globals";
import { checkRole } from "@/app/utils/roles";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function TeacherDashBoard(role: Roles) {
  const { sessionClaims } = auth();

  if (!checkRole("teacher")) {
    console.log("UNAUTHORIZED"); //end user session in clerk

    return redirect("/unauthorized");
  }

  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
