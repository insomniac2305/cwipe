import { MatchSessionItem } from "@/app/match/MatchSessionItem";
import { getMatchSessions } from "@/app/match/actions";
import { ErrorMessage } from "../components/ErrorMessage";

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
            <MatchSessionItem
              key={matchSession.id}
              matchSession={matchSession}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
