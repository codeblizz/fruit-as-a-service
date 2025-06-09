import AuthRepository from "@/packages/repository/src/auth.repository";
import RepositoryFactory from "@/packages/repository/src/factory.repository";
import {
  IAuthInterface,
  TSignIn,
  TSignUp,
} from "@/packages/types/src/auth.type";

export function AuthService<T>(urlResource: string) {
  
  let api: IAuthInterface;
  const authRepository = AuthRepository<T>(urlResource);
  api = RepositoryFactory().get(urlResource) as unknown as IAuthInterface;
  
  return Object.assign({}, authRepository, {
    signIn: async (credentials: TSignIn) => {
      return await api.signIn(credentials);
    },
    signUp: async (payload: TSignUp) => {
      return await api.signUp(payload);
    },
    getRefreshToken: async (payload: any) => {
      return await api.getRefreshToken(payload);
    }
  });
}
