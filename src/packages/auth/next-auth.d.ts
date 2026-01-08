import { DefaultJWT } from "next-auth/jwt";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    type: string;
    userId: string;
    firstName: string;
    lastName: string;
    businessName: string;
    isActive: boolean;
    isVerified: boolean;
    termsAccepted: boolean;
    profileImageUrl?: string;
    roles: Array<string>;
    permissions?: Array<string>;
  }

  interface Session extends DefaultSession {
    id: string;
    type?: string;
    expires: string;
    provider?: string;
    error?: string | null;
    locale?: string;
    accessToken?: string;
    refreshToken?: string;
    user: Omit<User, "accessToken" | "refreshToken" | "type">;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    exp: number;
    iat: number;
    jti: string;
    type: string;
    provider: string;
    id_token?: string;
    accessToken: string;
    refreshToken: string;
    error?: string | null;
    user: Omit<User, "accessToken" | "refreshToken" | "type">;
  }

  type CustomJWT = JWT;
}
