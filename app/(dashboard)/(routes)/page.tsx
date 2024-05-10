import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
      <p>
        If you're not signed in you must not see this!!!!!!
      </p>
    </div>
  );
}
