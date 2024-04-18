"use server";

import { auth } from "@/app/lib/auth";
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
