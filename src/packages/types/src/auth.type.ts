import { SVGProps } from "react";
import { AxiosResponse } from "axios";
import { AppUser } from "./user.type";
import { IClientMainRepository } from "@/packages/types/src/repository.type";
import { DistributivePick } from "./utils.type";

// Token NextAuth type
export type TAuthToken = {
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type TSignIn = Pick<AppUser, "email"> & {
  password: string;
  rememberMe?: boolean;
};

export type SignUp = Pick<
  AppUser,
  "email" | "firstName" | "lastName" | "businessName" | "termsAccepted"
> & {
  password: string;
};

export type PayloadType = {
  payload: IAuthUserReturnType;
  id: string;
};

// Return `type` NextAuth User property and App Standard API
export interface IAuthUserReturnType {
  status: number;
  message: string;
  timestamp: string;
  metadata: Record<string, unknown> | null;
  data:
    | ({
        accessToken: string;
        refreshToken: string;
        type: string;
      } & AppUser)
    | { userId: string };
}

export type AuthUserSignUpReturnType = Omit<IAuthUserReturnType, "data"> & {
  data: DistributivePick<IAuthUserReturnType["data"], "userId">;
};

// OAUTH Provider type
export type OauthProviderType = {
  clientId: string;
  clientSecret: string;
};

export type SsoDetailsType = {
  payload: AppUser;
  accessToken: string;
};

export type RefreshToken = { token: string };

export type TagType<T> = {
  [key: string]: (args: T) => Promise<T>;
};

export type CredentialType = {
  email: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string | boolean;
  redirect: string | boolean;
};

export type AuthField = {
  type: string;
  className: string;
  placeholder: string;
  name:
    | "email"
    | "password"
    | "termsAccepted"
    | "businessName"
    | "firstName"
    | "lastName";
};

export type EmailType = "VERIFICATION" | "PASSWORD_RESET" | "NOTIFICATION";

export interface IEmailConfigItem {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  nextSteps: string[];
  ctaText: string;
  ctaLink: string;
  secondaryLinkText: string;
  secondaryLinkAction: () => void;
}

export interface IAuthInterface extends IClientMainRepository {
  signIn: (credentials: TSignIn) => Promise<AxiosResponse<IAuthUserReturnType>>;
  signUp: (payload: SignUp) => Promise<AxiosResponse<AuthUserSignUpReturnType>>;
  getRefreshToken: (payload: any) => Promise<AxiosResponse<unknown>>;
  verifyToken: (token: string) => Promise<unknown>;
}
