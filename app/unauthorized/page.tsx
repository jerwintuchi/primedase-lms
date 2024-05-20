import React from "react";
import MainNav from "../landing/mainnav";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const UnauthorizedPage = () => {
  return (
    <div>
      {/* Navbar */}
      <MainNav />

      {/* Unauthorized Page Content */}
      <div className="bg-yellow-200 h-[calc(100vh-72px)] text-purple-700 flex flex-col justify-center items-center">
        <img
          src="error.svg"
          alt="Unauthorized Access"
          className="h-auto w-auto mb-4"
        />
        <h1 className="text-4xl">Uh oh! Access Denied</h1>
        <p className="text-lg mb-4">
          It looks like you tried to access a page you don't have permission
          for.
        </p>
        <Link href="/landing">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            <SignOutButton redirectUrl="/sign-in">Sign in again</SignOutButton>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
