import { getMatches } from "@/app/match/[id]/actions";
import { useState } from "react";
import useSWR from "swr";

export default function useMatches(
  matchSessionId: string,
  isRefreshPaused?: boolean,
) {
  const [lastMatchRequestDate, setLastMatchRequestDate] = useState<Date>();

  const matchesFetcher = ([, id]: [key: string, id: string]) => {
    const fetcher = getMatches(id, lastMatchRequestDate);
    setLastMatchRequestDate(new Date());
    return fetcher;
  };

  const { data: matches, mutate: mutateMatches } = useSWR(
    ["match/matches", matchSessionId],
    matchesFetcher,
    { refreshInterval: 10000, isPaused: () => !!isRefreshPaused },
  );

  return { matches, mutateMatches };
}
