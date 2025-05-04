import { AppReturnType } from "@/packages/types/src/utils.type";
import { ClientMainRepositoryInterface } from "@/packages/types/src/repository.type";

// App Project User type
export type AppUser = {
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
export type AuthToken = {
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

// Omitting `type` property for user details
export type UserDetail = Omit<AppUser, "type">;

// Represents the zustand state of a single user
export type UserState = {
  user: UserDetail;
  clearUser: () => void;
  updateUser: (user: UserDetail) => void;
};
// Sign In `type` property for user details
export type SignInType = Pick<AppUser, "email"> & { password: string };

// Sign Up `type` property for user details
export type SignUpType = Pick<
  AppUser,
  "email" | "fullName" | "agreement"
> & { password: string };

export type PayloadType = {
  payload: AuthUserReturnType
  id: "error" | "success";
}

// Return `type` NextAuth User property and App Standard API
export interface AuthUserReturnType extends AppReturnType {
  statusText?: string;
  user: AppUser;
}

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
  name: "email" | "password" | "acceptTerms";
};

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  acceptTerms: false;
} & Login;

// Authentication Domain Interface
export interface AuthInterface extends ClientMainRepositoryInterface {
  signIn: (credentials: SignInType) => Promise<AuthUserReturnType>;
  signUp: (payload: SignUpType) => Promise<AuthUserReturnType>;
  getRefreshToken: (payload: any) => Promise<unknown>;
}
