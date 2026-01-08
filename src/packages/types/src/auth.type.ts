import { IAppReturnType } from "@/packages/types/src/utils.type";
import { IClientMainRepository } from "@/packages/types/src/repository.type";

// App Project User type
export type TAppUser = {
  email: string;
  fullName: string;
  username: string;
  agreement: boolean;
  profilePic: string;
  roles: {
    user: number;
    admin: number;
  };
  permissions: {
    user: number;
    admin: number;
  };
  type: "credentials" | "oauth";
};

// Token NextAuth type
export type TAuthToken = {
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

// Omitting `type` property for user details
export type TUserDetail = Omit<TAppUser, "type">;

// Represents the zustand state of a single user
export type TUserState = {
  user: TUserDetail;
  clearUser: () => void;
  updateUser: (user: TUserDetail) => void;
};
// Sign In `type` property for user details
export type TSignIn = Pick<TAppUser, "email"> & { password: string };

// Sign Up `type` property for user details
export type TSignUp = Pick<
  TAppUser,
  "email" | "fullName" | "agreement"
> & { password: string };

export type TPayloadType = {
  payload: IAuthUserReturnType
  id: "error" | "success";
}

// Return `type` NextAuth User property and App Standard API
export interface IAuthUserReturnType extends IAppReturnType {
  statusText?: string;
  user: TAppUser;
}

// OAUTH Provider type
export type TOauthProviderType = {
  clientId: string;
  clientSecret: string;
};

export type TSsoDetailsType = {
  payload: TAppUser;
  accessToken: string;
};

export type TRefreshToken = { token: string };

export type TagType<T> = {
  [key: string]: (args: T) => Promise<T>;
};

export type TCredentialType = {
  email: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string | boolean;
  redirect: string | boolean;
};

export type TAuthField = {
  type: string;
  className: string;
  placeholder: string;
  name: "email" | "password" | "acceptTerms";
};

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  acceptTerms: false;
} & TLogin;

// Authentication Domain Interface
export interface IAuthInterface extends IClientMainRepository {
  signIn: (credentials: TSignIn) => Promise<IAuthUserReturnType>;
  signUp: (payload: TSignUp) => Promise<IAuthUserReturnType>;
  getRefreshToken: (payload: any) => Promise<unknown>;
}
