"use server";

import { auth } from "@/app/lib/auth";
import { MatchSession } from "@/app/lib/definitions";
import { addUserToMatchSession } from "@/app/match/[id]/actions";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function createMatchSession() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return;

  const matchSessionData = await sql`
  INSERT INTO match_sessions (is_started)
  VALUES (false)
  RETURNING id`;

  const id = matchSessionData.rows[0].id;

  if (!id) return;

  await addUserToMatchSession(id, userId, true);

  redirect(`/match/${id}`);
}

export async function getMatchSessions(): Promise<MatchSession[]> {
  const session = await auth();
  const userId = session?.user?.id;

  const matchSessionData = await sql`
  SELECT id, providers, genres, is_started, COUNT(msm.movie_id) as match_count
  FROM match_sessions ms
  INNER JOIN match_sessions_users msu
  ON ms.id = msu.match_session_id and msu.user_id = ${userId}
  INNER JOIN match_session_matches msm
  ON ms.id = msm.match_session_id
  GROUP BY ms.id, ms.providers, ms.genres, ms.is_started`;

  const matchSessions = await Promise.all(
    matchSessionData.rows.map(async (row) => {
      const userData = await sql`
      SELECT u.id, msu.is_host, u.name, u.image
      FROM match_sessions_users msu
      INNER JOIN users u
      ON msu.user_id = u.id
      WHERE msu.match_session_id = ${row.id}`;

      return {
        id: row.id,
        providers: row.providers,
        genres: row.genres,
        users: userData.rows,
        is_started: row.is_started,
        match_count: row.match_count,
      };
    }),
  );

  return matchSessions;
}
