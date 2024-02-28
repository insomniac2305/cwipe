import { randomUUID } from "crypto";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Anonymous",
      credentials: { name: { label: "Username", type: "text" } },
      async authorize(credentials) {
        if (credentials.name) {
          console.log(credentials);

          const user = { id: randomUUID(), name: credentials.name as string };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
