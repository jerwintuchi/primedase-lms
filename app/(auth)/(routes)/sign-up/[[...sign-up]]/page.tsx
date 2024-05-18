import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
    <h1 className="text-3xl pl-16 pb-6 text-purple-700">
        <strong>
          Start your Learning Journey!
        </strong>
    </h1>
    <SignIn path="/sign-up" />
  </div>

  );
}
