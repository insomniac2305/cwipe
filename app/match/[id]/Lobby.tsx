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

export default function Lobby({
  matchSession,
}: {
  matchSession: MatchSession;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSWR(matchSession.id, getMatchSession, {
    refreshInterval: 10000,
    fallbackData: matchSession,
  });

  const isUserHost = data.users.find(
    (user) => user.id === session?.user?.id,
  )?.is_host;

  const start = async () => {
    setIsLoading(true);
    await startMatchSession(matchSession.id);
    router.refresh();
  };

  useEffect(() => {
    if (data.is_started) {
      router.refresh();
    }
  }, [data.is_started, router]);

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-auto p-8 md:max-h-[40rem] md:max-w-screen-md">
        <h1 className="font-heading text-2xl">Lobby</h1>
        <div className="flex flex-auto flex-wrap content-start items-start gap-2 py-4">
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
        <div className="flex justify-center">
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
