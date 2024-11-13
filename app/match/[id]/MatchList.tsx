import { ErrorMessage } from "@/app/components/ErrorMessage";
import { getMatches } from "@/app/match/[id]/actions";
import { MatchListItem } from "@/app/match/[id]/MatchListItem";

export async function MatchList({
  matchSessionId,
}: {
  matchSessionId: string;
}) {
  const { data: matchedMovies, error } = await getMatches(matchSessionId);
  return (
    <div className="-mr-2 flex flex-1 flex-col items-center justify-center overflow-y-auto pr-2">
      {error ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : matchedMovies.length === 0 ? (
        <p className="rounded-2xl bg-content1 p-4 text-center font-medium">
          No matches yet, keep swiping!
        </p>
      ) : (
        <ul className="flex flex-1 flex-col gap-2 self-stretch">
          {matchedMovies.map((movie) => (
            <MatchListItem key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}
