import { auth } from "@/app/lib/auth";
import Lobby from "@/app/match/[id]/Lobby";
import {
  getMovies,
  getMatchSession,
  addUserToMatchSession,
} from "@/app/match/[id]/actions";
import MovieStack from "@/app/match/[id]/movieStack";
import { User } from "next-auth";

export default async function MatchSession({
  params,
}: {
  params: { id: string };
}) {
  const matchSession = await getMatchSession(params.id);
  const session = await auth();
  const userId = session?.user?.id as string;

  const isUserJoined = !!matchSession.users.find((user) => user.id === userId);
  const isSessionStarted = matchSession.is_started;

  switch (true) {
    case !isSessionStarted && !isUserJoined: {
      await addUserToMatchSession(matchSession.id, userId);
      matchSession.users.push(session?.user as User);
      //fall through
    }
    case !isSessionStarted && isUserJoined:
      return <Lobby matchSession={matchSession} />;
    case isSessionStarted && !isUserJoined:
      throw new Error(
        "The host has already started this matching session! Please go back to create a new one.",
      );
    case isSessionStarted && isUserJoined: {
      const movies = await getMovies();
      return <MovieStack movies={movies} />;
    }
  }
}
