import { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import {
  TSignIn,
  SignUp,
  IAuthUserReturnType,
  AuthUserSignUpReturnType,
} from "@/packages/types/src/auth.type";
import CONSTANT from "@/packages/helpers/src/constants";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import ClientMainRepository from "@/packages/repository/src/mainRepository/client.repository";

const authPartUrl = "/api/auth";

export default function AuthRepository<T>(urlResource: string) {
  if (!utils.isTUnionFromURLResource(urlResource))
    throw new Error(`url resource -- ${urlResource} not recognized`);
  const clientMainRepository = ClientMainRepository<T>(urlResource);

  return {
    ...clientMainRepository,
    signIn: async (
      payload: TSignIn
    ): Promise<AxiosResponse<IAuthUserReturnType>> => {
      const { proxyClient } = await axiosServer();
      const response = await proxyClient.post(
        `${authPartUrl}/${urlResource}`,
        {
          ...payload,
        },
        {
          skipAuth: true,
        }
      );
      return response.data;
    },
    signUp: async (
      payload: SignUp
    ): Promise<AxiosResponse<AuthUserSignUpReturnType>> => {
      const { proxyClient } = await axiosServer();
      const response = await proxyClient.post(
        `${authPartUrl}/${urlResource}`,
        {
          ...payload,
        },
        {
          skipAuth: true,
        }
      );
      return response.data;
    },
    getRefreshToken: async (payload: any): Promise<AxiosResponse<unknown>> => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.get(`${authPartUrl}/${urlResource}`, {
        ...payload,
      });
    },
    verifyToken: async (token: string) => {
      if (!token || token.length !== CONSTANT.VERIFICATION_CODE_LENGTH) {
        // In a real application, the URL token (JWT) is long, and the manual token is short (OTP).
        // This mock assumes a short code for demonstration purposes.
        // If a long URL token is present, we allow it.
        if (token.length < 6) {
          throw new Error("Invalid code length or token is missing.");
        }
      }

      console.log(`[Repository] Attempting verification for code: ${token}`);

      // Simulation of network call delay
      // return await new Promise((resolve) =>
      //   setTimeout(resolve, Math.random() * 800 + 400)
      // );

      // Simulate backend response based on a simple success case
      // if (token === "123456") {
      //   console.log("[Repository] Verification successful (Mock).");
      //   return true;
      // } else if (token.includes("error")) {
      //   throw new Error("Server rejected code: expired or wrong code.");
      // }

      // Simulate successful verification
      // console.log("[Repository] Verification successful.");
      // return true;
    },
  };
}
