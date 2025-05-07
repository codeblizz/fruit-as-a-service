export interface CustomError extends Exclude<Error, "stack"> {
  code?: number | undefined;
}

export interface ErrorProps {
  error: Error,
  reset: () => void;
}

export interface AppReturnType {
  status: boolean;
  message: string;
  statusCode?: number;
}

export type ToastState = {
  toast: Toast;
  clearToast: () => void;
  updateToast: (isOpen: boolean, message: string, className: string) => void;
}

export type Toast = {
  isOpen: boolean;
  message: string;
  className: string;
};

export const URLResource = {
  SSO: "sso",
  HOME: "home",
  FRUIT: "fruit",
  SIGNIN: "signin",
  SIGNUP: "signup",
  F_SERVICE: "fService"
} as const;

export type UnionFromURLResource = (typeof URLResource)[keyof typeof URLResource];
