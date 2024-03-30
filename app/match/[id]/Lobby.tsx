"use client";

import { MatchSession } from "@/app/lib/definitions";

export default function Lobby({
  matchSession,
}: {
  matchSession: MatchSession;
}) {
  return <main>{matchSession.userIds}</main>;
}
