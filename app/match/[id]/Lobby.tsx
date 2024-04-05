"use client";

import { User } from "@/app/components/User";
import { MatchSession } from "@/app/lib/definitions";
import { Button } from "@nextui-org/react";
import { ShareButton } from "@/app/match/[id]/ShareButton";
import useSWR from "swr";
import { getMatchSession, startMatchSession } from "@/app/match/[id]/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Lobby({
  matchSession,
}: {
  matchSession: MatchSession;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSWR(matchSession.id, getMatchSession, {
    refreshInterval: 10000,
    fallbackData: matchSession,
  });

  const start = async () => {
    setIsLoading(true);
    await startMatchSession(matchSession.id);
    router.refresh();
  };

  useEffect(() => {
    if (data.isStarted) {
      router.refresh();
    }
  }, [data.isStarted, router]);

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-auto p-8 md:max-h-[40rem] md:max-w-screen-md">
        <h1 className="font-heading text-2xl">Lobby</h1>
        <div className="flex flex-auto flex-wrap content-start items-start gap-2 py-4">
          {data.users.map((user, index) => (
            <User
              key={user.id}
              name={user.name || `User ${index}`}
              imageSrc={user.image || undefined}
            />
          ))}
          <ShareButton id={matchSession.id} />
        </div>
        <div className="flex justify-center">
          <Button color="primary" onPress={start} isLoading={isLoading}>
            Start matching
          </Button>
        </div>
      </div>
    </main>
  );
}
