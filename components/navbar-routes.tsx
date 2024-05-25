"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { isTeacher } from "@/lib/teacher";
const NavbarRoutes = () => {
  const { userId } = useAuth();

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button
            size="sm"
            className="text-white bg-red-500 hover:bg-red-800 hover:text-white size-auto">
            <LogOut className="h-4 w-4 mr-2" />
            Back to Student Mode
          </Button>
        </Link>
      ) : isTeacher(userId) ? (
        <Link href="/teacher/courses">
          <Button
            size="sm"
            variant="ghost"
            className="text-purple-900 bg-purple-400 
                    hover:bg-purple-400/20 hover:text-purple-700 border-indigo-900 size-auto">
            Teacher Mode
          </Button>
        </Link>
      ) : null}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
