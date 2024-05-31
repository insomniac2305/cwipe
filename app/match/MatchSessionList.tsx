import { MatchSessionItem } from "@/app/match/MatchSessionItem";
import { getMatchSessions } from "@/app/match/actions";
import { ErrorMessage } from "../components/ErrorMessage";
import { CreateMatchSessionForm } from "./CreateMatchSessionForm";

export async function MatchSessionList() {
  const { data: matchSessions, error } = await getMatchSessions();
  return (
    <div className="flex h-full w-full flex-col gap-2 p-8">
      <h1 className="mb-2 font-heading text-2xl">Match Sessions</h1>
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
      <div className="self-center">
        <CreateMatchSessionForm />
      </div>
    </div>
  );
}
