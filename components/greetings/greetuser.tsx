import { useUser } from "@clerk/nextjs";

export const GreetUser = () => {
  const { user } = useUser();
  return <div className="text-1xl text-white">Hi, {user?.username}!</div>;
};
