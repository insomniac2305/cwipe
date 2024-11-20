import ListSkeleton from "@/app/components/ListSkeleton";
import SignOutButton from "@/app/components/SignOutButton";
import { auth } from "@/app/lib/auth";
import GoogleSignInButton from "@/app/login/GoogleSignInButton";
import { UserPreferences } from "@/app/preferences/UserPreferences";
import { Avatar, Button, Divider, Link } from "@nextui-org/react";
import { Suspense } from "react";
import { FaHouse, FaPenToSquare } from "react-icons/fa6";

export default async function Preferences() {
  const session = await auth();

  return (
    <main className="h-dvh w-dvw">
      {session?.user && (
        <div className="flex h-full w-full justify-center md:items-center">
          <div className="flex w-full flex-col gap-2 p-4 md:w-[45rem]">
            <div className="mb-4 flex justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  as={Link}
                  isIconOnly
                  href="/"
                  className="text-xl"
                  variant="flat"
                >
                  <FaHouse />
                </Button>
                <h1 className="font-heading text-3xl">Preferences</h1>
              </div>
              <SignOutButton />
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <Avatar
                name={session.user.name || ""}
                src={session.user.image || ""}
                className="h-20 w-20 shrink-0 text-lg"
              />
              <p className="text-xl font-bold">{session.user.name}</p>
            </div>
            <Button
              as={Link}
              href="/onboarding"
              startContent={<FaPenToSquare />}
              color="primary"
            >
              Edit preferences
            </Button>
            <Divider className="my-4" />
            <Suspense fallback={<ListSkeleton />}>
              <UserPreferences />
            </Suspense>

            {!session.user?.isProviderAccount && (
              <div>
                <GoogleSignInButton />
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
