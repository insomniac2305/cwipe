"use server";

import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import { auth } from "@/app/lib/auth";
import { GetResult, MatchSession } from "@/app/lib/definitions";
import { addUserToMatchSession } from "@/app/match/[id]/lib/actions";

export async function createMatchSession() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { error: { message: "Unauthorized" } };

  let id;

  try {
    const matchSessionData = await sql`
    INSERT INTO match_sessions (is_started)
    VALUES (false)
    RETURNING id`;

    id = matchSessionData.rows[0].id;

    if (!id) throw new Error();

    const addUserResult = await addUserToMatchSession(id, true);
    if (addUserResult?.error) throw new Error();
  } catch (error) {
    return { error: { message: "Error creating match session" } };
  }

  redirect(`/match/${id}`);
}

export async function getMatchSessions(): GetResult<MatchSession[]> {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const matchSessionData = await sql`
      SELECT ms.id, msp.providers, msp.genres, ms.is_started, COUNT(msm.movie_id) as match_count
      FROM match_sessions ms
      INNER JOIN match_sessions_users msu
      ON ms.id = msu.match_session_id and msu.user_id = ${userId}
      LEFT JOIN match_session_matches msm
      ON ms.id = msm.match_session_id
      LEFT JOIN match_session_preferences msp
      ON ms.id = msp.match_session_id
      GROUP BY ms.id, msp.providers, msp.genres, ms.is_started`;

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

    return { data: matchSessions };
  } catch (error) {
    return { error: { message: "Error loading match sessions" } };
  }
}
