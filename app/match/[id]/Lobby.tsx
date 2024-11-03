"use client";

import { User } from "@/app/components/User";
import { MatchSession } from "@/app/lib/definitions";
import { Badge, Button } from "@nextui-org/react";
import { ShareButton } from "@/app/match/[id]/ShareButton";
import useSWR from "swr";
import { getMatchSession, startMatchSession } from "@/app/match/[id]/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCrown } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { MenuButton } from "@/app/components/MenuButton";

export default function Lobby({
  matchSession,
}: {
  matchSession: MatchSession;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [startError, setStartError] = useState<string>();
  const { data, error: fetchError } = useSWR(
    ["match/lobby", matchSession.id],
    matchSessionFetcher,
    {
      refreshInterval: 10000,
      fallbackData: matchSession,
    },
  );

  const isUserHost = data.users.find(
    (user) => user.id === session?.user?.id,
  )?.is_host;

  const start = async () => {
    setIsLoading(true);
    const startSessionResult = await startMatchSession(matchSession.id);
    if (startSessionResult?.error) {
      setStartError(startSessionResult.error.message);
      setIsLoading(false);
      return;
    }
    router.refresh();
  };

  useEffect(() => {
    if (data.is_started) {
      router.refresh();
    }
  }, [data.is_started, router]);

  const error = startError || fetchError;

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-auto p-8">
        <div className="flex items-center gap-4">
          <MenuButton />
          <h1 className="font-heading text-2xl">Lobby</h1>
        </div>
        <div className="grid flex-auto grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] content-start justify-items-center gap-2 py-4">
          {data.users.map((user, index) => (
            <Badge
              key={user.id}
              content={<FaCrown />}
              size="lg"
              color="secondary"
              isOneChar
              shape="circle"
              isInvisible={!user.is_host}
              aria-label="Is host"
            >
              <User
                name={user.name || `User ${index}`}
                imageSrc={user.image || undefined}
              />
            </Badge>
          ))}
          <ShareButton id={matchSession.id} />
        </div>
        <div className="flex flex-col items-center gap-4">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            color={isUserHost ? "primary" : "default"}
            onPress={start}
            isLoading={isLoading}
            isDisabled={!isUserHost}
          >
            {isUserHost ? "Start matching" : "Wait for host to start"}
          </Button>
        </div>
      </div>
    </main>
  );
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
