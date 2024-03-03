import SignOutButton from "@/app/components/SignOutButton";
import { auth } from "@/app/lib/auth";
import GoogleSignInButton from "@/app/login/GoogleSignInButton";
import { Image } from "@nextui-org/react";

export default async function Preferences() {
  const session = await auth();

  return (
    <main>
      {session && (
        <div className="flex flex-col items-center gap-2 p-4">
          <p>User ID: {session.user?.id}</p>
          <p>User Name: {session.user?.name}</p>
          <p>Email: {session.user?.email}</p>
          <Image
            src={session.user?.image as string | undefined}
            alt="Profile Picture"
            referrerPolicy="no-referrer"
            width={50}
            height={50}
          />
          <div>
            <SignOutButton />
          </div>
          {session.user?.isProviderAccount && (
            <div>
              <GoogleSignInButton />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
