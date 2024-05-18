"use client";
import { createUserWithRole } from "@/app/(auth)/mutator";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const handleSubmit = async (role: any) => {
    // Handle form submission logic, call the createUserWithRole function
    await createUserWithRole(role, "student"); // --with the supplied metadata
  };

  return (
    <div className="flex flex-col items-center">
      {/* Your signup form */}
      <form onSubmit={handleSubmit}>
        {/* Form fields for student data */}
        <button type="submit">Sign Up as Student</button>
      </form>
      <SignUp path="/sign-up" />
    </div>
  );
}
