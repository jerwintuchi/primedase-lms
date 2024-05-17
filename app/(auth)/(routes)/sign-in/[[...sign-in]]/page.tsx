import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
  <div>
    <h1 className="text-3xl pl-16 pb-6 text-purple-700">
        <strong>
          Welcome Student!
        </strong>
    </h1>
    <SignIn path="/sign-in" />
  </div>

  );
}
