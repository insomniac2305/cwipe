import React from "react";
import { Link, Chip, Button, AvatarGroup, Avatar } from "@nextui-org/react";
import { MatchSession } from "@/app/lib/definitions";

export function MatchSessionItem({
  matchSession,
}: {
  matchSession: MatchSession;
}) {
  return (
    <Button
      as={Link}
      variant="flat"
      href={`match/${matchSession.id}`}
      className="flex w-full items-center justify-between px-4 py-8"
    >
      <AvatarGroup max={3}>
        {matchSession.users.map((user) => (
          <Avatar
            key={user.id + matchSession.id}
            src={user.image as string | undefined}
            name={user.name as string | undefined}
          />
        ))}
      </AvatarGroup>
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
    </Button>
  );
}
