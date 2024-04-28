import { MatchSessionItem } from "@/app/match/MatchSessionItem";
import { createMatchSession, getMatchSessions } from "@/app/match/actions";
import { Button } from "@nextui-org/react";
import { ErrorMessage } from "../components/ErrorMessage";

export default async function Match() {
  const { data: matchSessions, error } = await getMatchSessions();

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col gap-2 p-8 md:max-h-[40rem] md:max-w-screen-md">
        <h1 className="mb-2 font-heading text-2xl">Match Sessions</h1>
        {error ? (
          <div className="flex flex-1 items-center justify-center">
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ) : (
          <ul className="flex flex-1 flex-col gap-2">
            {matchSessions.map((matchSession) => (
              <MatchSessionItem
                key={matchSession.id}
                matchSession={matchSession}
              />
            ))}
          </ul>
        )}
        <form className="self-center" action={createMatchSession}>
          <Button color="primary" type="submit">
            Start session
          </Button>
        </form>
      </div>
    </main>
  );
}
