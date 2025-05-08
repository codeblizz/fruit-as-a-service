import createAxiosClients from "@/packages/helpers/src/libs/axiosClients";
import { ClientMainRepositoryInterface } from "@/packages/types/src/repository.type";

// Create and Destructure Axios Clients Instance
const { nextAxiosClient } = createAxiosClients();

const ClientMainRepository = <T>(
  resource: string
): ClientMainRepositoryInterface => ({
  // Define the methods for the client repository
  get: async (payload: Record<string, unknown>): Promise<T[]> => {
    const response = await nextAxiosClient.get(`/api/${resource}`, {
      params: { ...payload },
    });
    return response.data;
  },

  post: async (payload: unknown): Promise<T[]> => {
    const response = await nextAxiosClient.post(`/api/${resource}`, payload);
    return response.data;
  },

  update: async (id: number | string, payload: unknown): Promise<T> => {
    const response = await nextAxiosClient.put(
      `/api/${resource}/${id}`,
      payload
    );
    return response.data;
  },

  delete: async (id?: number | string): Promise<T> => {
    const response = await nextAxiosClient.delete(`/api/${resource}/${id}`);
    return response.data;
  },
});

export default ClientMainRepository;
