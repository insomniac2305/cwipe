"use client";

import { ErrorMessage } from "@/app/components/ErrorMessage";
import { MatchListItem } from "@/app/match/[id]/components/MatchListItem";
import useMatches from "@/app/match/[id]/lib/useMatches";

export function MatchList({ matchSessionId }: { matchSessionId: string }) {
  const { matches: matchedMovies, error } = useMatches(matchSessionId);

  return (
    <div className="flex flex-1 flex-col items-center justify-center overflow-hidden">
      {error ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : matchedMovies?.length === 0 ? (
        <p className="rounded-2xl bg-content1 p-4 text-center font-medium">
          No matches yet, keep swiping!
        </p>
      ) : (
        <ul className="flex h-full flex-1 flex-col gap-2 self-stretch overflow-y-auto pr-2">
          {matchedMovies?.map((movie) => (
            <MatchListItem key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
