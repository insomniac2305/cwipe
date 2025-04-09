import { Suspense } from "react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Skeleton } from "@heroui/skeleton";
import { FaHouse } from "react-icons/fa6";
import { auth } from "@/app/lib/auth";
import ListSkeleton from "@/app/components/ListSkeleton";
import SignOutButton from "@/app/components/SignOutButton";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { UserPreferences } from "@/app/preferences/components/UserPreferences";
import { EditPreferencesButton } from "@/app/preferences/components/EditPreferencesButton";

export default async function Preferences() {
  const session = await auth();

  return (
    <main className="flex min-h-dvh w-dvw justify-center md:items-center">
      {session?.user && (
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
              imgProps={{ referrerPolicy: "no-referrer" }}
              className="h-20 w-20 shrink-0 text-lg"
            />
            <p className="text-xl font-bold">{session.user.name}</p>
          </div>
          {!session.user?.isProviderAccount && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Card className="bg-warning/20 text-warning">
                <CardBody>
                  You are using a temporary account. Sign in to save your match
                  history and preferences
                </CardBody>
                <CardFooter className="justify-center pt-1">
                  <GoogleSignInButton />
                </CardFooter>
              </Card>
            </div>
          )}
          <Suspense fallback={<Skeleton className="h-10 rounded-2xl" />}>
            <EditPreferencesButton />
          </Suspense>
          <Divider className="my-4" />
          <Suspense fallback={<ListSkeleton />}>
            <UserPreferences />
          </Suspense>
        </div>
      )}
    </main>
  );
}
