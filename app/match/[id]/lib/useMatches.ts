import { useState } from "react";
import useSWR from "swr";
import { MovieMatch } from "@/app/lib/definitions";
import { getMatches } from "@/app/match/[id]/lib/actions";

export default function useMatches(
  matchSessionId: string,
  isRefreshPaused?: boolean,
) {
  const [lastMatchRequestDate, setLastMatchRequestDate] = useState<Date>(
    new Date(),
  );
  const [newMatches, setNewMatches] = useState<MovieMatch[]>([]);

  const matchesFetcher = async ([, id]: [key: string, id: string]) => {
    const result = await getMatches(id);

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  };

  const {
    data: matches,
    mutate: mutateMatches,
    error,
  } = useSWR(["match/matches", matchSessionId], matchesFetcher, {
    refreshInterval: 10000,
    isPaused: () => !!isRefreshPaused,
  });

  const resultsSinceLastRequest = matches?.filter(
    (movieMatch) => movieMatch.last_rated_at > lastMatchRequestDate,
  );

  if (resultsSinceLastRequest && resultsSinceLastRequest.length > 0) {
    setNewMatches(resultsSinceLastRequest);
    setLastMatchRequestDate(new Date());
  }

  return { matches, newMatches, mutateMatches, error };
}
