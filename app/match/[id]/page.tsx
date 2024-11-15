import { auth } from "@/app/lib/auth";
import MatchSessionLobby from "@/app/match/[id]/MatchSessionLobby";
import {
  getMovies,
  getMatchSession,
  addUserToMatchSession,
} from "@/app/match/[id]/actions";
import MovieStack from "@/app/match/[id]/MovieStack";
import { User } from "next-auth";

export default async function MatchSession({
  params,
}: {
  params: { id: string };
}) {
  const { data: matchSession, error } = await getMatchSession(params.id);
  const session = await auth();
  const userId = session?.user?.id as string;

  const isUserJoined = !!matchSession?.users.find((user) => user.id === userId);
  const isSessionStarted = matchSession?.is_started;

  switch (true) {
    case !!error: {
      throw new Error(error.message);
    }
    case !isSessionStarted && !isUserJoined: {
      const addUserResult = await addUserToMatchSession(matchSession.id);
      if (addUserResult?.error) throw new Error(addUserResult.error.message);
      matchSession.users.push(session?.user as User);
      //fall through
    }
    case !isSessionStarted && isUserJoined:
      return (
        <MatchSessionLobby matchSession={matchSession} session={session} />
      );
    case isSessionStarted && !isUserJoined:
      throw new Error(
        "The host has already started this matching session! Please go back to create a new one.",
      );
    case isSessionStarted && isUserJoined: {
      const movies = await getMovies(matchSession.id, 1);
      if (movies.error) throw new Error(movies.error.message);
      return <MovieStack matchSession={matchSession} movies={movies.data} />;
    }
  }
}
