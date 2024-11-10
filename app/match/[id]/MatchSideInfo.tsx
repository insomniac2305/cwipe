import { Suspense } from "react";
import ListSkeleton from "@/app/components/ListSkeleton";
import { MatchList } from "./MatchList";

export async function MatchSideInfo({
  matchSessionId,
}: {
  matchSessionId: string;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-8">
      <h1 className="mb-2 text-nowrap font-heading text-2xl">Movie Matches</h1>
      <Suspense fallback={<ListSkeleton />}>
        <MatchList matchSessionId={matchSessionId} />
      </Suspense>
    </div>
  );
}
