import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const page = () => {
  const {} = auth();
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default page;
