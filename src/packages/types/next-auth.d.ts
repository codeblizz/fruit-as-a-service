import { DefaultJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { PayloadType } from '@/types/auth.type';

declare module "next-auth" {
  interface Session extends DefaultSession {
    id?: string;
    type?: string;
    expires: number;
    provider?: string;
    error: string | undefined;
    locale: string | undefined;
    payload: PayloadType["payload"];
    accessToken: string | undefined;
    refreshToken: string | undefined;
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
    payload: PayloadType["payload"];
  }
}
