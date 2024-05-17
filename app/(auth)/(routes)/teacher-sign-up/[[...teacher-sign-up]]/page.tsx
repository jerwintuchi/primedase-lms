import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl pb-3.5 text-purple-700 ">
        <strong>
          Start your teaching journey now!
        </strong>
      </h1>
      <div className="pb-5">
        <SignUp path="/teacher-sign-up"/>
      </div>
      
    </div>
  
);
}