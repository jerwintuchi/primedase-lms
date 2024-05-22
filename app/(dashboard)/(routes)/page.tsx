import { Roles } from "@/app/types/globals";
import { checkRole } from "@/app/utils/roles";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function TeacherDashBoard(role: Roles): JSX.Element {
  if (checkRole("student")) {
    return redirect("/student");
  } else if (!checkRole("teacher")) {
    console.log("UNAUTHORIZED");

    return redirect("/unauthorized");
  }

  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
