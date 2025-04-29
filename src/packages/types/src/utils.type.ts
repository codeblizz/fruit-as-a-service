export interface CustomError extends Exclude<Error, "stack"> {
  code?: number | undefined;
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

export const AsConstant = {
  SSO: "sso",
  HOME: "home",
  FRUIT: "fruit",
  SIGNIN: "signin",
  SIGNUP: "signup",
  F_SERVICE: "fService"
} as const;
