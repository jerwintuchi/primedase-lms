import { SignUp } from "@clerk/nextjs";

export default async function Page() {

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl pb-3.5 text-purple-700 ">
        <strong>Share your knowledge Teacher!</strong>
      </h1>
      <SignUp path="/teacher-sign-up" />
      
    </div>
    
  );
}
