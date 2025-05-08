import AuthRepository from "@/packages/repository/src/auth.repository";
import RepositoryFactory from "@/packages/repository/src/factory.repository";
import {
  AuthInterface,
  SignInType,
  SignUpType,
} from "@/packages/types/src/auth.type";

export function AuthService<T>(urlResource: string) {
  
  let api: AuthInterface;
  const authRepository = AuthRepository<T>(urlResource);
  api = RepositoryFactory().get(urlResource) as unknown as AuthInterface;
  
  return Object.assign({}, authRepository, {
    signIn: async (credentials: SignInType) => {
      return await api.signIn(credentials);
    },
    signUp: async (payload: SignUpType) => {
      return await api.signUp(payload);
    },
    getRefreshToken: async (payload: any) => {
      return await api.getRefreshToken(payload);
    }
  });
}
