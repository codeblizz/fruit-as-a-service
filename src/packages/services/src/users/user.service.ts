import RepositoryFactory from "@/packages/repository/src/factory.repository";
import UserRepository from "@/packages/repository/src/user.repository";
import { IUserInterface } from "@/packages/types/src/user.type";

export function UserService<T>(urlResource: string) {
  
  let api: IUserInterface;
  const userRepository = UserRepository<T>(urlResource);
  api = RepositoryFactory().get(urlResource) as unknown as IUserInterface;
  
  return { ...userRepository, 
    fetchUserById: async (userId: string) => {
      return await api.fetchUserById(userId);
    },
    fetchAllUser: async () => {
      return await api.fetchAllUser();
    },
  };
}
