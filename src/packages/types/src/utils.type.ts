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
  statusCode?: number;
}

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
  FRUIT: "fruit",
  SIGNIN: "signin",
  SIGNUP: "signup",
  F_SERVICE: "fService"
} as const;

export type TUnionFromURLResource = (typeof URLResource)[keyof typeof URLResource];
