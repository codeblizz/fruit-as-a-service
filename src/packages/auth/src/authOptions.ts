import { AxiosResponse } from "axios";
import { DefaultJWT, JWT } from "next-auth/jwt";
import utils from "@/packages/helpers/src/utils";
import { AdapterUser } from "next-auth/adapters";
// import { getServerEnv } from "@/packages/config/env";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import credentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "@/packages/services/src/auth/auth.service";
import type {
  Account,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";

// const serverEnv = getServerEnv();

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
      async authorize(credentials) {
        if (!credentials) return null;
        let user: User | null = null;
        const { email, password } = credentials;
        try {
          const result = (await AuthService("signin").signIn({
            email,
            password,
          })) as unknown as AxiosResponse;
          const { status, data } = result;
          if (status === 200) {
            user = { ...data } as User;
          }
          return user;
        } catch (error) {
          throw utils.formatError(error);
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       scope: "openid email profile",
    //       access_type: "offline",
    //       prompt: "consent",
    //     },
    //   },
    // }),
    // FacebookProvider({
    //   clientId: serverEnv.FACEBOOK_CLIENT_ID,
    //   clientSecret: serverEnv.FACEBOOK_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       scope: "public_profile email",
    //     },
    //   },
    // }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 86400000, // 24 hours
  },
  session: {
    strategy: "jwt",
    maxAge: 86400000, // 24 hours
  },
  callbacks: {
    async jwt({
      token,
      user,
      profile,
      account,
    }: {
      token: DefaultJWT;
      user?: User | AdapterUser;
      account: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: any;
    }): Promise<JWT> {
      let resultToken: JWT = token as JWT;
      if (user) {
        const authUser = user as User;
        const {
          accessToken,
          refreshToken,
          type,
          firstName,
          lastName,
          email,
          userId,
          profileImageUrl,
          permissions,
          businessName,
          termsAccepted,
          isActive,
          isVerified,
          roles,
        } = authUser;

        resultToken = {
          ...resultToken,
          accessToken,
          refreshToken,
          type,
          user: {
            email,
            id: userId,
            name: `${firstName} ${lastName}`,
            userId,
            firstName,
            lastName,
            profileImageUrl,
            permissions,
            businessName,
            termsAccepted,
            isActive,
            isVerified,
            roles,
          },
          ...(account && {
            provider: account.provider,
            id_token: account.id_token,
          }),
          error: null,
        } as JWT;
      }
      if (
        !user &&
        resultToken.type === "credentials" &&
        resultToken.refreshToken &&
        utils.checkIfTokenExpired(resultToken.exp)
      ) {
        try {
          const authToken = await utils.refreshAccessToken({
            token: resultToken.refreshToken,
          });
          resultToken = {
            ...resultToken,
            error: authToken.error ?? null,
            accessToken: authToken.accessToken ?? resultToken.accessToken,
            refreshToken: authToken.refreshToken ?? resultToken.refreshToken,
          };
        } catch (error: unknown) {
          const formattedError = utils.formatError(error);
          resultToken = {
            ...resultToken,
            error: formattedError.message,
            accessToken: "",
            refreshToken: "",
          };
        }
      }

      return resultToken;
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
          id: token.jti || token.sub || token.user.userId,
          error: token.error,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          user: token.user,
        } as Session;
      }

      if (session.type === "oauth" && token.id_token) {
        session.accessToken = token.id_token;
      }

      return session;
    },
  },
};
