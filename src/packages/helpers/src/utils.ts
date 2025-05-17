import { JWT } from "next-auth/jwt";
import { AxiosResponse } from "axios";
import CONSTANT from "@/packages/helpers/src/constants";
import { ErrorType } from "@/packages/store/src/errorSlice";
import { AuthService } from "@/packages/services/src/auth/auth.service";
import { AuthToken, RefreshToken } from "@/packages/types/src/auth.type";
import { URLResource, UnionFromURLResource, CustomError } from "@/packages/types/src/utils.type";

const utils = {
  isUnionFromURLResource: function(value: string): value is UnionFromURLResource {
    return Object.values(URLResource).includes(value as UnionFromURLResource)
  },
  customError: function (message: string, code?: number) {
    const error = new Error(message) as CustomError;
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
    refreshToken: RefreshToken
  ): Promise<AuthToken> {
    let token = {} as AuthToken;

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
};

export default utils;
