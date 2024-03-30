import Error from "@/app/components/Error";
import { auth } from "@/app/lib/auth";
import Lobby from "@/app/match/[id]/Lobby";
import {
  getMovies,
  getMatchSession,
  addUserToMatchSession,
} from "@/app/match/[id]/actions";
import MovieStack from "@/app/match/[id]/movieStack";

export default async function MatchSession({
  params,
}: {
  params: { id: string };
}) {
  const matchSession = await getMatchSession(params.id);
  const session = await auth();
  const userId = session?.user?.id as string;

  if (matchSession.error !== undefined)
    return <Error>{matchSession.error}</Error>;

  const isJoined = matchSession.data.userIds.includes(userId);
  const isStarted = matchSession.data.isStarted;

  switch (true) {
    case !isStarted && !isJoined: {
      const { error } = await addUserToMatchSession(
        matchSession.data.id,
        userId,
      );
      if (error) {
        return <Error>{error}</Error>;
      }
      matchSession.data.userIds.push(userId);
      //fall through
    }
    case !isStarted && isJoined:
      return <Lobby matchSession={matchSession.data} />;
    case isStarted && !isJoined:
      return (
        <Error>
          {
            "The host has already started this matching session! Please go back to create a new one."
          }
        </Error>
      );
    case isStarted && isJoined: {
      const movies = await getMovies();
      return <MovieStack movies={movies} />;
    }
  }
}
