import React from "react";
import MainNav from "./mainnav";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <MainNav />
      {/* Landing Page Content */}
      <div className="bg-yellow-300 h-[calc(100vh-72px)] text-purple-700 bg-full flex flex-col justify-center items-center">
        <Image
          width={50}
          height={50}
          src="primedase.svg"
          alt="Logo"
          className="h-auto w-auto mb-4"
        />
        <h1 className="text-4xl">Welcome to Our Website!</h1>
      </div>
    </div>
  );
};

export default LandingPage;
