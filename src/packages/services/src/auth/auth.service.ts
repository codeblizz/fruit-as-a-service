import { AxiosResponse } from "axios";
import AuthRepository from "@/packages/repository/src/auth.repository";
import RepositoryFactory from "@/packages/repository/src/factory.repository";
import {
  TSignIn,
  SignUp,
  IAuthInterface,
  IAuthUserReturnType,
  AuthUserSignUpReturnType,
} from "@/packages/types/src/auth.type";

export function AuthService<T>(urlResource: string) {
  let api: IAuthInterface;
  const authRepository = AuthRepository<T>(urlResource);
  api = RepositoryFactory().get(urlResource) as unknown as IAuthInterface;

  return {
    ...authRepository,
    signIn: async (
      credentials: TSignIn
    ): Promise<AxiosResponse<IAuthUserReturnType>> => {
      return await api.signIn(credentials);
    },
    signUp: async (
      payload: SignUp
    ): Promise<AxiosResponse<AuthUserSignUpReturnType>> => {
      return await api.signUp(payload);
    },
    getRefreshToken: async (payload: any) => {
      return await api.getRefreshToken(payload);
    },
    verifyToken: async (token: string) => {
      return await api.verifyToken(token);
    },
  };
}
