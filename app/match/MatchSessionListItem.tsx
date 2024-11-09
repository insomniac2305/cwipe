import React from "react";
import { Chip, AvatarGroup, Avatar } from "@nextui-org/react";
import { MatchSession } from "@/app/lib/definitions";
import { auth } from "@/app/lib/auth";
import { ContinueMatchSessionButton } from "./ContinueMatchSessionButton";

export async function MatchSessionListItem({
  matchSession,
}: {
  matchSession: MatchSession;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  const displayedUsers = matchSession.users.filter(
    (user) => user.id !== userId,
  );

  return (
    <li className="flex w-full min-w-80 items-center gap-2 rounded-2xl bg-content2 p-4 shadow-lg">
      <div className="flex flex-1 justify-start">
        {displayedUsers.length > 0 ? (
          <AvatarGroup max={2}>
            {displayedUsers.map((user) => (
              <Avatar
                key={user.id + matchSession.id}
                src={user.image as string | undefined}
                name={user.name as string | undefined}
              />
            ))}
          </AvatarGroup>
        ) : (
          <Avatar name="You" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Chip
          color={
            matchSession.is_started
              ? matchSession.match_count > 0
                ? "success"
                : "primary"
              : "default"
          }
          size="sm"
          variant="flat"
        >
          {matchSession.is_started
            ? matchSession.match_count > 0
              ? `${matchSession.match_count} Matches`
              : "Started"
            : "Not started"}
        </Chip>
        <ContinueMatchSessionButton id={matchSession.id} />
      </div>
    </li>
  );
}
