import { useUser } from "@clerk/nextjs";

export const GreetUser = () => {
  const { user } = useUser();
  return <div className="text-1xl text-purple-700">Hi, {user?.username}</div>;
};
