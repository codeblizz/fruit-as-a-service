import { AppUser } from "@/packages/types/src/user.type";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import ClientMainRepository from "@/packages/repository/src/mainRepository/client.repository";

const partUserUrl = "/api/users";

export default function UserRepository<T>(URLResource: string) {
  const clientMainRepository = ClientMainRepository<T>(URLResource);

  return {
    ...clientMainRepository,
    fetchUserById: async (userId: string): Promise<AppUser> => {
      const { backendClient } = await axiosServer();
      const result = await backendClient.get(
        `${partUserUrl}/${URLResource}?${userId}`
      );
      return result.data;
    },
    fetchAllUser: async (): Promise<AppUser> => {
      const { backendClient } = await axiosServer();
      const result = await backendClient.get(`${partUserUrl}/${URLResource}`);
      return result.data;
    },
  };
}
