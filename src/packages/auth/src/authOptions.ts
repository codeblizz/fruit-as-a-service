import { JWT } from "next-auth/jwt";
import { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import type { NextAuthOptions, Session, User } from "next-auth";
import { AuthService } from "@/services/src/auth/auth.service";
import credentialsProvider from "next-auth/providers/credentials";

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
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> {
        if (!credentials) return null;
        const { email, password } = credentials;
        try {
          const result = await AuthService("signin").signIn({
            email,
            password,
          }) as unknown as AxiosResponse;
          const { message, statusCode, statusText, user } = result.data;
          return {
            payload: {
              message,
              statusCode,
              statusText,
              user: { ...user },
            },
            id: "success",
          } as User;
        } catch (error) {
          throw utils.formatError(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  jwt: {
    maxAge: 3600,
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, user, profile, account }): Promise<JWT> {
      if (user) {
        token = {
          ...token,
          ...user,
          ...account,
          ...profile,
        };
      }
      if (
        token && token.type === "credentials" &&
        utils.checkIfTokenExpired(token.exp)
      ) {
        try {
          const authToken = await utils.refreshAccessToken({
            token: token.refreshToken,
          });
          token = {
            ...token,
            error: authToken.error ?? "",
            accessToken: authToken.accessToken ?? "",
            refreshToken: authToken.refreshToken ?? "",
          };
        } catch (error: unknown) {
          throw utils.formatError(error);
        }
      }
      return Promise.resolve(token);
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session = {
          ...session,
          ...token,
        };
      }
      session.provider = token.provider;
      session.id = token.jti ?? token.id;
      session.accessToken =
        token.type === "oauth" ? token.id_token : token.accessToken;


      return Promise.resolve(session);
    },
  },
};
