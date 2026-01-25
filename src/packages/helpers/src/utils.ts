import { JWT } from "next-auth/jwt";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { AxiosResponse, isAxiosError } from "axios";
import CONSTANT from "@/packages/helpers/src/constants";
import { AuthService } from "@/packages/services/src/auth/auth.service";
import { TAuthToken, RefreshToken } from "@/packages/types/src/auth.type";
import {
  URLResource,
  TUnionFromURLResource,
  ICustomError,
  TErrorDetails,
} from "@/packages/types/src/utils.type";

const utils = {
  isTUnionFromURLResource: function (
    value: string
  ): value is TUnionFromURLResource {
    return Object.values(URLResource).includes(value as TUnionFromURLResource);
  },
  customError: function (message: string, code?: number) {
    const error = new Error(message) as ICustomError;
    error.code = code ?? undefined;
    return error;
  },
  formatQuery: function (
    payload: Record<string, string | number | boolean>
  ): string {
    let toReturn = "?";
    for (const key in payload) {
      toReturn += `${key}=${payload[key]}&`;
    }
    return toReturn.slice(0, -1);
  },
  isObject: function (
    value:
      | Record<string, unknown>
      | { [key: string]: { [key: string]: string } }
  ): boolean {
    return !!value && value.constructor === Object;
  },
  isDate: function (value: unknown) {
    return Object.prototype.toString.call(value) === "[object Date]";
  },
  formatError: (error: unknown): TErrorDetails => {
    let message = "An unknown error occurred";
    let statusCode = 500;
    if (isAxiosError(error)) {
      statusCode = error.response?.status || 500;
      const responseData = error.response?.data;
      message =
        responseData?.message ||
        responseData?.error ||
        responseData?.name ||
        error.message;
    } else if (error instanceof Error) {
      message = error.message;
      if ("code" in error && typeof error.code === "number") {
        statusCode = error.code;
      }
    } else if (error && typeof error === "object") {
      if ("message" in error && typeof error.message === "string") {
        message = error.message;
      }
      if ("code" in error && typeof error.code === "number") {
        statusCode = error.code;
      } else if ("status" in error && typeof error.status === "number") {
        statusCode = error.status;
      }
    } else if (typeof error === "string") {
      message = error;
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
  isValidObject: (fruit: Record<string, any>) => {
    return Object.prototype.toString.call(fruit) === "[object Object]" && 
           Object.keys(fruit).length > 0;
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
      roles: CONSTANT.defaultUser.roles,
    };
  },
  refreshAccessToken: async function (
    refreshToken: RefreshToken
  ): Promise<TAuthToken> {
    let token = {} as TAuthToken;

    try {
      const { data } = (await AuthService("refreshToken").getRefreshToken(
        refreshToken
      )) as unknown as AxiosResponse;
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
  asyncHandler: async function <T>(
    fn: () => Promise<T>
  ): Promise<[T | null, Error | null]> {
    try {
      const result = await fn();
      return [result, null];
    } catch (error) {
      return [null, error instanceof Error ? error : new Error(String(error))];
    }
  },
  formatCurrency: function (amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  },
  generateId: function (prefix: string = ""): string {
    return `${prefix}${Date.now().toString(36)}${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  },
  generateBatchNumber: (categoryCode: string) => {
    const year = new Date().getFullYear();
    const code = categoryCode.toUpperCase().substring(0, 3).padEnd(3, "X");
    const uniqueSegment = Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase();
    return `BN-${year}-${code}-${uniqueSegment}`;
  },
};

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default utils;
