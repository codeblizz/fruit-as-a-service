import type { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import {
  CredentialType,
} from "@/packages/types/src/auth.type";

export const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string> | undefined
      ) {
        if (!credentials) return null;
        const { email, password } = credentials as CredentialType;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  jwt: {
    maxAge: 3600,
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  callbacks: {},
};