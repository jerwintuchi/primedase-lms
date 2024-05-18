import { createUserWithRole } from "@/app/(auth)/mutator";
import { SignUp } from "@clerk/nextjs";
import router from "next/router";
import { NextApiRequest } from "next/types";
import toast from "react-hot-toast";

export default async function Page() {
  const handleSignUp = async (userData: any) => {
    try {
      await createUserWithRole(
        { url: router.asPath } as NextApiRequest,
        userData,
        router.asPath.startsWith("/teacher-sign-up/") ? "teacher" : "student"
      );
      router.push("/"); // Redirect to a success page or perform any other desired action
    } catch (error) {
      toast.error("Error creating user:");
      // Handle any errors during user creation (e.g., display error message)
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl pb-3.5 text-purple-700 ">
        <strong>Share your knowledge Teacher!</strong>
      </h1>
      <SignUp path="/teacher-sign-up" />
      
    </div>
    
  );
}
