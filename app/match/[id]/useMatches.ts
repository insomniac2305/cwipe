import { getMatches } from "@/app/match/[id]/actions";
import { useState } from "react";
import useSWR from "swr";

export default function useMatches(
  matchSessionId: string,
  isRefreshPaused?: boolean,
) {
  const [lastMatchRequestDate, setLastMatchRequestDate] = useState<Date>();

  const matchesFetcher = async ([, id]: [key: string, id: string]) => {
    const result = await getMatches(id, lastMatchRequestDate);

    if (result.error) {
      throw new Error(result.error.message);
    }

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

  return { matches, mutateMatches, error };
}
