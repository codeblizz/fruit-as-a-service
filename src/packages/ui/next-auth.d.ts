import { DefaultJWT } from "next-auth/jwt";
import { PayloadType } from "@/types/src/auth.type";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isVerified: boolean;
    termsAccepted: boolean;
    roles: Array<string>;
    permissions: Array<string>;
  }
  interface Session extends DefaultSession {
    id?: string;
    user: User;
    type?: string;
    expires: number;
    provider?: string;
    error: string | undefined;
    locale: string | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    exp: number;
    user: User;
    iat: number;
    jti: string;
    type: string;
    provider: string;
    id_token?: string;
    accessToken: string;
    refreshToken: string;
  }
}
