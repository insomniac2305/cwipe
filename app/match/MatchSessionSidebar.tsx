import { CreateMatchSessionForm } from "./CreateMatchSessionForm";
import { Suspense } from "react";
import MatchSessionListSkeleton from "@/app/match/MatchSessionListSkeleton";
import { MatchSessionList } from "./MatchSessionList";

export async function MatchSessionSidebar() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-8">
      <h1 className="mb-2 text-nowrap font-heading text-2xl">Match Sessions</h1>
      <Suspense fallback={<MatchSessionListSkeleton />}>
        <MatchSessionList />
      </Suspense>
      <div className="self-center">
        <CreateMatchSessionForm />
      </div>
    </div>
  );
}
