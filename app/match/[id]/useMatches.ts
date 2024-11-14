import { MovieMatch } from "@/app/lib/definitions";
import { getMatches } from "@/app/match/[id]/actions";
import { useState } from "react";
import useSWR from "swr";

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

    const resultsSinceLastRequest = result.data.filter(
      (movieMatch) => movieMatch.last_rated_at > lastMatchRequestDate,
    );

    setNewMatches(resultsSinceLastRequest);
    setLastMatchRequestDate(new Date());

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

  return { matches, newMatches, mutateMatches, error };
}
