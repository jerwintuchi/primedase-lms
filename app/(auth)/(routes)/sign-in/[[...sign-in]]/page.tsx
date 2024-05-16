import MainNav from "@/app/landing/mainnav";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
  <div>
    <SignIn path="/sign-in" />
  </div>

  );
}
