import { Suspense } from "react";
import ListSkeleton from "@/app/components/ListSkeleton";
import { MenuButton } from "@/app/components/MenuButton";
import { UserAvatarLink } from "@/app/match/components/UserAvatarLink";
import { CreateMatchSessionForm } from "@/app/match/components/CreateMatchSessionForm";
import { MatchSessionList } from "@/app/match/components/MatchSessionList";

export async function MatchSideNav() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-6">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-nowrap font-heading text-2xl">Match Sessions</h1>
        <MenuButton />
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <MatchSessionList />
      </Suspense>
      <div className="flex justify-between">
        <UserAvatarLink href="/preferences" />
        <CreateMatchSessionForm />
      </div>
    </div>
  );
}
