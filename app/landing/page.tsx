import React from "react";
import MainNav from "./mainnav";
import Image from "next/image";
import RuneBg from "../(dashboard)/_components/rune-bg";

const LandingPage = () => {
  return (
    <div className="bg-black">
      {/* Navbar */}
      <MainNav />
      {/* Landing Page Content */}
      <div className="h-screen text-white bg-full flex flex-col justify-center items-center">
        <Image
          width={50}
          height={50}
          src="grimoire-logo.svg"
          alt="Logo"
          className="pb-16 h-auto w-auto mb-4"
        />
        <RuneBg />
      </div>
    </div>
  );
};

export default LandingPage;
