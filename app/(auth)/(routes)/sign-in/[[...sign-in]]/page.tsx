import MainNav from "@/app/landing/mainnav";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
  <div> {/* Add a background color class here */}
    <SignIn path="/sign-in" />
  </div>

  );
}
