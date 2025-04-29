import { ErrorType } from "@/packages/store/errorSlice";
import { CustomError } from "@/packages/types/utils.type";

const utils = {
  defaultUser: {
    email: "",
    fullName: "",
    username: "",
    profilePic: "",
    agreement: false,
    roles: {
      user: 0,
      admin: 1,
    },
    permissions: {
      user: 0,
      admin: 1,
    },
  },
  customError: function (message: string, code?: number) {
    const error = new Error(message) as CustomError;
    error.code = code ?? undefined;
    return error;
  },
  isObject: function (
    value: Record<string, unknown> | { [key: string]: { [key: string]: string } }
  ): boolean {
    return !!value && value.constructor === Object;
  },
  isDate: function (value: unknown) {
    return Object.prototype.toString.call(value) === "[object Date]";
  },
  formatError: function (error: unknown): ErrorType {
    let message;
    let statusCode;
    // if (error && isAxiosError<AxiosErrorMessageType>(error) && error.response) {
    //   statusCode = error.response.status;
    //   message = error.response.data?.name || error.response.data?.message;
    // } 
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      "code" in error
    ) {
      statusCode = error.code as number;
      message = error.message as string;
    } else {
      message = "An unknown error occurred";
      statusCode = 500;
    }
    return {
      message,
      statusCode,
      status: false,
    };
  },
};

export default utils;
