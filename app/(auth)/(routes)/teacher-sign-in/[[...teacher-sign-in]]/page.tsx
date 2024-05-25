import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl pb-3.5 text-purple-700 ">
        <strong>Hi Teacher!</strong>
      </h1>
      <div className="pb-5">
        <SignIn path="/teacher-sign-in" forceRedirectUrl={"/"} />
      </div>
    </div>
  );
}
