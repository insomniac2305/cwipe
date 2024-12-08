import { MatchSession } from "@/app/lib/definitions";
import { getMatchSession } from "@/app/match/[id]/lib/actions";
import useSWR from "swr";

export function useMatchSession(id: string, fallbackData?: MatchSession) {
  const { data: matchSession, error } = useSWR(
    ["match/lobby", id],
    matchSessionFetcher,
    {
      refreshInterval: 10000,
      fallbackData,
    },
  );

  return { matchSession, error };
}

async function matchSessionFetcher([, matchSessionId]: [
  key: string,
  matchSessionId: string,
]) {
  const { data, error } = await getMatchSession(matchSessionId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
