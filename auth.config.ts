import vercelPostgresAdapter from "@/app/lib/vercelPostgresAdapter";
import type { NextAuthConfig } from "next-auth";
import {} from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";

declare module "next-auth" {
  interface User {
    isProviderAccount?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isProviderAccount?: boolean;
  }
}

const dbAdapter = vercelPostgresAdapter();

export const authConfig = {
  pages: { signIn: "/login" },
  adapter: dbAdapter,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider,
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ name: z.string().min(1) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          let user: AdapterUser = {
            id: crypto.randomUUID(),
            name: parsedCredentials.data.name,
            email: crypto.randomUUID(),
            emailVerified: null,
          };

          if (dbAdapter.createUser) {
            user = await dbAdapter.createUser(user);
          }

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, profile, trigger }) => {
      if (user?.id && profile && trigger === "signIn" && dbAdapter.updateUser) {
        const updateUser: Partial<AdapterUser> & Pick<AdapterUser, "id"> = {
          id: user.id,
          name: profile.name || (user.name as string),
          email: profile.email || (user.email as string),
          image: profile.picture || user.image,
        };
        dbAdapter.updateUser(updateUser);

        return {
          ...token,
          name: updateUser.name,
          email: updateUser.email,
          picture: updateUser.image,
          isProviderAccount: true,
        };
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      sub: token.sub,
      user: {
        ...session.user,
        id: token.sub,
        name: token.name,
        email: token.email,
        image: token.picture,
        isProviderAccount: token.isProviderAccount,
      },
    }),
  },
} satisfies NextAuthConfig;
