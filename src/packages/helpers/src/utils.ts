import { JWT } from "next-auth/jwt";
import { AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CONSTANT from "@/packages/helpers/src/constants";
import { ErrorType } from "@/packages/store/src/errorSlice";
import { AuthService } from "@/packages/services/src/auth/auth.service";
import { TAuthToken, TRefreshToken } from "@/packages/types/src/auth.type";
import { URLResource, TUnionFromURLResource, ICustomError } from "@/packages/types/src/utils.type";

const utils = {
  isTUnionFromURLResource: function(value: string): value is TUnionFromURLResource {
    return Object.values(URLResource).includes(value as TUnionFromURLResource)
  },
  customError: function (message: string, code?: number) {
    const error = new Error(message) as ICustomError;
    error.code = code ?? undefined;
    return error;
  },
  formatQuery: function (payload: Record<string, string | number | boolean>): string {
    let toReturn = "?";
    for (const key in payload) {
      toReturn += `${key}=${payload[key]}&`;
    }
    return toReturn.slice(0, -1);
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
  checkIfTokenExpired: function (expiresAt: number) {
    const dateNow = Math.floor(Date.now() / 1000);
    return dateNow > expiresAt;
  },
  getOAuthUser: function (token: JWT) {
    return {
      ...CONSTANT.defaultUser,
      type: token.type,
      email: token.email,
      fullName: token.name,
      profilePic: token.image,
      provider: token.provider,
      lastName: token.family_name,
      firstName: token.given_name,
      username: token.given_name + "_" + token.id,
      roles: { ...CONSTANT.defaultUser.roles, user: 1 },
    };
  },
  refreshAccessToken: async function (
    refreshToken: TRefreshToken
  ): Promise<TAuthToken> {
    let token = {} as TAuthToken;

    try {
      const { data } = await AuthService("refreshToken").getRefreshToken(
        refreshToken
       ) as unknown as AxiosResponse;
      token = {
        error: null,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      return token;
    } catch (error: unknown) {
      console.error("refreshAccessToken error", error);
      throw {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  },
  asyncHandler: async function<T>(
    fn: () => Promise<T>
  ): Promise<[T | null, Error | null]> {
    try {
      const result = await fn();
      return [result, null];
    } catch (error) {
      return [null, error instanceof Error ? error : new Error(String(error))];
    }
  },
  formatCurrency: function(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  },
  generateId: function(prefix: string = ''): string {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).substring(2, 9)}`;
  }
};

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default utils;
