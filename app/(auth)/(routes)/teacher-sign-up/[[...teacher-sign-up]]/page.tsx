import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl pb-4 text-purple-700 no-scroll">
        <strong>
          Start your teaching journey now!
        </strong>
      </h1>
      <SignUp path="/teacher-sign-up" />
    </div>
  
);
}