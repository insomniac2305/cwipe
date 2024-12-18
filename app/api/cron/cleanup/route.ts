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
          USING users u
          WHERE msu.user_id = u.id
          AND u.id NOT IN (SELECT user_id FROM accounts) 
          AND u.updated_at < NOW()::date - 90`;

    await sql`      
          DELETE
          FROM user_preferences up
          USING users u
          WHERE up.user_id = u.id
          AND u.id NOT IN (SELECT user_id FROM accounts) 
          AND u.updated_at < NOW()::date - 90`;

    await sql`      
          DELETE
          FROM users_movies um
          USING users u
          WHERE um.user_id = u.id
          AND u.id NOT IN (SELECT user_id FROM accounts) 
          AND u.updated_at < NOW()::date - 90`;

    await sql`      
          DELETE
          FROM users u
          WHERE u.id NOT IN (SELECT user_id FROM accounts) 
          AND u.updated_at < NOW()::date - 90`;

    await sql`      
          DELETE
          FROM match_sessions ms
          WHERE ms.id NOT IN (SELECT match_session_id FROM match_sessions_users)`;

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
