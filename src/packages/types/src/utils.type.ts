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
