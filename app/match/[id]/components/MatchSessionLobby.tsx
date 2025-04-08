"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Badge, Button } from "@heroui/react";
import { FaCrown } from "react-icons/fa6";
import { MatchSession } from "@/app/lib/definitions";
import { User } from "@/app/components/User";
import { MenuButton } from "@/app/components/MenuButton";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { useSideNavContext } from "@/app/match/components/MatchLayout";
import { startMatchSession } from "@/app/match/[id]/lib/actions";
import { ShareButton } from "@/app/match/[id]/components/ShareButton";
import { useMatchSession } from "@/app/match/[id]/lib/useMatchSession";

export default function MatchSessionLobby({
  matchSession,
  session,
}: {
  matchSession: MatchSession;
  session: Session | null;
}) {
  const { isSideNavVisible } = useSideNavContext();
  const [isLoading, setIsLoading] = useState(false);
  const [startError, setStartError] = useState<string>();
  const { matchSession: updatedMatchSession, error: updateError } =
    useMatchSession(matchSession.id, matchSession);

  const isUserHost = updatedMatchSession?.users.find(
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
    location.reload();
  };

  useEffect(() => {
    if (updatedMatchSession?.is_started) {
      location.reload();
    }
  }, [updatedMatchSession?.is_started]);

  const error = startError || updateError;

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden">
      <div className="flex h-full w-full flex-col overflow-auto p-6">
        <div className="flex items-center gap-4">
          {!isSideNavVisible && <MenuButton />}
          <h1 className="flex h-10 items-center font-heading text-2xl">
            Lobby
          </h1>
        </div>
        <div className="grid flex-auto grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] content-start justify-items-center gap-2 py-4">
          {updatedMatchSession?.users.map((user, index) => (
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
