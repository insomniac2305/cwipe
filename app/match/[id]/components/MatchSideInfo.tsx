import { MatchListButton } from "@/app/components/MatchListButton";
import { MatchList } from "@/app/match/[id]/components/MatchList";

export async function MatchSideInfo({
  matchSessionId,
}: {
  matchSessionId: string;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-6">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-nowrap font-heading text-2xl">Movie Matches</h1>
        <MatchListButton />
      </div>
      <MatchList matchSessionId={matchSessionId} />
    </div>
  );
}
