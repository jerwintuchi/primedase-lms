import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
    <h1 className="text-3xl  pb-6 text-purple-700">
        <strong>
          Start your Teaching Journey!
        </strong>
    </h1>
    <input type="hidden" name="role" value="student" />
    <SignUp path="/teacher-sign-up" />
  </div>

  );
}
