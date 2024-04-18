import { MatchSessionItem } from "@/app/match/MatchSessionItem";
import { createMatchSession, getMatchSessions } from "@/app/match/actions";
import { Button } from "@nextui-org/react";

export default async function Match() {
  const matchSessions = await getMatchSessions();

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col gap-2 p-8 md:max-h-[40rem] md:max-w-screen-md">
        <h1 className="mb-2 font-heading text-2xl">Match Sessions</h1>
        <ul className="flex flex-1 flex-col gap-2">
          {matchSessions.map((matchSession) => (
            <MatchSessionItem
              key={matchSession.id}
              matchSession={matchSession}
            />
          ))}
        </ul>
        <form className="self-center" action={createMatchSession}>
          <Button color="primary" type="submit">
            Start session
          </Button>
        </form>
      </div>
    </main>
  );
}
