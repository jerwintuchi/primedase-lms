import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl pt-2 pl-16 pb-6 text-purple-700 no-scroll">
        <strong>
          Become a Student!
        </strong>
    </h1>
    <SignUp path="/sign-up" />
    </div>
    
)
  
}