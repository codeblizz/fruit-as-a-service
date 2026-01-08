export interface ICustomError extends Omit<Error, "stack"> {
  code?: number | undefined;
}

export interface IErrorProps {
  error: Error,
  reset: () => void;
}

export interface IAppReturnType {
  status: boolean;
  message: string;
  statusCode: number;
}

export type DistributivePick<T, K extends keyof any> = T extends any 
  ? Pick<T, Extract<keyof T, K>> 
  : never;

export interface IApiResponseData<T> {
  timestamp: string | Date;
  status: number;
  message: string;
  data: T;
  metadata: Record<string, unknown> | null;
}

export type TErrorDetails = IAppReturnType;

export interface IToast {
  isOpen: boolean;
  message: string;
  className: string;
};

export type TToastState = {
  toast: IToast;
  clearToast: () => void;
  updateToast: (isOpen: boolean, message: string, className: string) => void;
}

export const URLResource = {
  SSO: "sso",
  HOME: "home",
  USER: "user",
  FRUITS: "fruits",
  SIGNIN: "signin",
  SIGNUP: "signup",
  ORIGINS: "origins",
  VERIFY_TOKEN: "verify-token",
  FRUIT_INVENTORY: "inventories",
  FRUIT_CATEGORIES: "categories",
  F_SERVICE: "fService"
} as const;

export type TUnionFromURLResource = (typeof URLResource)[keyof typeof URLResource];
