"use client";
import { createUserWithRole } from "@/app/(auth)/mutator";
import { SignUp } from "@clerk/nextjs";



export default async function Page() {
  const handleSubmit = async (role: any) => {
    // Handle form submission logic (e.g., validate data)
    await createUserWithRole(role, "teacher"); // Call function with data and role
  };

  return (
    <div className="flex flex-col items-center">
      {/* Your signup form */}
      <form onSubmit={handleSubmit}>
        {/* Form fields for teacher data */}
        <button type="submit">Sign Up as Teacher</button>
      </form>
      <SignUp path="/teacher-sign-up" />
    </div>
  );
}
