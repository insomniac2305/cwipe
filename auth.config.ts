import { randomUUID } from "crypto";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ name: z.string().min(1) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const user = {
            id: randomUUID(),
            name: parsedCredentials.data.name,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
