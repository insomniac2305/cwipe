import { MatchSessionItem } from "@/app/match/MatchSessionItem";
import { getMatchSessions } from "@/app/match/actions";
import { ErrorMessage } from "../components/ErrorMessage";
import { CreateMatchSessionForm } from "./CreateMatchSessionForm";

export default async function Match() {
  const { data: matchSessions, error } = await getMatchSessions();

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col gap-2 p-8 md:max-h-[40rem] md:max-w-screen-md">
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
    </main>
  );
}
