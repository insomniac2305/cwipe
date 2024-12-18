import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await cleanTempUsers();

  if (result.success) {
    return new Response(`Success`, { status: 200 });
  } else {
    return new Response(`Error`, { status: 500 });
  }
}

const cleanTempUsers = async () => {
  try {
    await sql`
          DELETE
          FROM match_sessions_users msu
          INNER JOIN users u
          ON msu.user_id = u.id
          WHERE u.id NOT IN (SELECT user_id FROM accounts) 
          AND u.updated_at < NOW()::date - 90;

          DELETE
          FROM user_preferences up
          INNER JOIN users u
          ON up.user_id = u.id
          WHERE u.id NOT IN (SELECT user_id FROM accounts) 
          AND u.updated_at < NOW()::date - 90;

          DELETE
          FROM users_movies um
          INNER JOIN users u
          ON um.user_id = u.id
          WHERE u.id NOT IN (SELECT user_id FROM accounts) 
          AND u.updated_at < NOW()::date - 90;

          DELETE
          FROM users u
          WHERE u.id NOT IN (SELECT user_id FROM accounts) 
          AND u.updated_at < NOW()::date - 90;

          DELETE
          FROM match_sessions ms
          LEFT JOIN match_sessions_users msu
          ON ms.id = msu.match_session_id
          WHERE msu.match_session_id IS NULL;`;

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
