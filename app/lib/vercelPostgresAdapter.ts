import { sql } from "@vercel/postgres";
import { Account } from "next-auth";
import { Adapter, AdapterAccount, AdapterUser } from "next-auth/adapters";

export default function vercelPostgresAdapter(): Adapter {
  const createUser = async (
    user: Omit<AdapterUser, "id">,
  ): Promise<AdapterUser> => {
    const { rows } = await sql`
        INSERT INTO users (name, email, image) 
        VALUES (${user.name}, ${user.email}, ${user.image}) 
        RETURNING id, name, email, email_verified, image`;
    const newUser: AdapterUser = {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    };
    return newUser;
  };

  const getUser = async (id: string) => {
    const { rows, rowCount } = await sql`
          SELECT *
          FROM users
          WHERE id = ${id};
        `;

    if (rowCount === 0) return null;

    return {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    };
  };

  const getUserByEmail = async (email: string) => {
    const { rows, rowCount } =
      await sql`SELECT * FROM users WHERE email = ${email}`;

    if (rowCount === 0) return null;

    return {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    };
  };

  const getUserByAccount = async ({
    provider,
    providerAccountId,
  }: {
    provider: string;
    providerAccountId: string;
  }): Promise<AdapterUser | null> => {
    const { rows, rowCount } = await sql`
      SELECT u.* 
      FROM users u join accounts a on u.id = a.user_id 
      WHERE a.provider_id = ${provider} 
      AND a.provider_account_id = ${providerAccountId}`;

    if (rowCount === 0) return null;

    return {
      email: rows[0].email,
      emailVerified: rows[0].email_verified,
      id: rows[0].id,
    };
  };

  const updateUser = async (
    user: Partial<AdapterUser> & Pick<AdapterUser, "id">,
  ): Promise<AdapterUser> => {
    const { rows } = await sql`
            UPDATE users
            SET name = ${user.name}, email = ${user.email}, image = ${user.image}
            WHERE id = ${user.id}
            RETURNING id, name, email, image;
            `;

    const updatedUser: AdapterUser = {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    };
    return updatedUser;
  };

  const deleteUser = async (userId: string) => {
    await sql`DELETE FROM users WHERE id = ${userId}`;
    return;
  };

  const linkAccount = async (
    account: AdapterAccount,
  ): Promise<AdapterAccount | null | undefined> => {
    await sql`
        INSERT INTO accounts (
            user_id, 
            provider_id, 
            provider_type, 
            provider_account_id, 
            refresh_token,
            access_token,
            expires_at,
            token_type,
            scope,
            id_token
        ) 
        VALUES (
            ${account.userId}, 
            ${account.provider},
            ${account.type}, 
            ${account.providerAccountId}, 
            ${account.refresh_token},
            ${account.access_token}, 
            to_timestamp(${account.expires_at}),
            ${account.token_type},
            ${account.scope},
            ${account.id_token}
        )`;
    return account;
  };

  const unlinkAccount = async ({
    providerAccountId,
    provider,
  }: {
    providerAccountId: Account["providerAccountId"];
    provider: Account["provider"];
  }) => {
    await sql`
            DELETE FROM accounts 
            WHERE provider_account_id = ${providerAccountId} AND provider_id = ${provider}}`;
    return;
  };

  return {
    createUser,
    getUser,
    updateUser,
    getUserByEmail,
    getUserByAccount,
    deleteUser,
    linkAccount,
    unlinkAccount,
  };
}
