import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl pb-6 text-red-700">
        <strong>Hello Teacher!</strong>
      </h1>
      <SignIn />
    </div>
  );
}
