"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { auth, getAuth } from "@clerk/nextjs/server";
import { isTeacher } from "@/lib/teacher";
import { checkRole } from "@/app/utils/roles";
import { GreetUser } from "./greetings/greetuser";
const NavbarRoutes = () => {
  const { userId } = useAuth();

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <div>
          <GreetUser />
          <Link href="/">
            <Button
              size="sm"
              className="text-white bg-red-500 hover:bg-red-800 hover:text-white size-auto">
              <LogOut className="h-4 w-4 mr-2" />
              Back to Student Mode
            </Button>
          </Link>
        </div> //isTeacher is from .env and teacherUser is from sessionClaims
      ) : isTeacher(userId) ? (
        <div>
          <GreetUser />
          <Link href="/teacher/courses">
            <Button
              size="sm"
              variant="ghost"
              className="text-purple-900 bg-purple-400 
                    hover:bg-purple-400/20 hover:text-purple-700 border-indigo-900 size-auto">
              Teacher Mode
            </Button>
          </Link>
        </div>
      ) : (
        <GreetUser />
      )}

      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default NavbarRoutes;
