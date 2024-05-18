import { UserButton } from "@clerk/nextjs"
import { getUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await getUser(); // Get currently logged-in user

  if (user) {
    const { role } = user.privateMetadata; // Access role from privateMetadata
    // ... Render UI elements or redirect based on role
  }
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
function getUser() {
  throw new Error("Function not implemented.");
}

