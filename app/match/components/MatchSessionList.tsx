import { ErrorMessage } from "@/app/components/ErrorMessage";
import { getMatchSessions } from "@/app/match/lib/actions";
import { MatchSessionListItem } from "@/app/match/components/MatchSessionListItem";

export async function MatchSessionList() {
  const { data: matchSessions, error } = await getMatchSessions();
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      {error ? (
        <ErrorMessage>{error.message}</ErrorMessage>
      ) : matchSessions.length === 0 ? (
        <p className="rounded-2xl bg-content1 p-4 text-center font-medium">
          There are no active sessions, click below to get started
        </p>
      ) : (
        <ul className="flex flex-1 flex-col gap-2 self-stretch">
          {matchSessions.map((matchSession) => (
            <MatchSessionListItem
              key={matchSession.id}
              matchSession={matchSession}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
