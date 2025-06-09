"server-only";

import createAxiosClients from "@/packages/helpers/src/libs/axiosClients";
import { IServerMainRepository } from "@/packages/types/src/repository.type";

// Create and Destructure Axios Server Instance
const { nodeAxiosClient } = createAxiosClients();

export const ServerMainRepository = <T>(
  resource: string
): IServerMainRepository => ({
  // Define the methods for the server repository
  get: (id: string, token: string): Promise<T[]> => {
    return nodeAxiosClient.get(`${resource}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  refreshToken: (token: string): Promise<T[]> => {
    return nodeAxiosClient.get(`${resource}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  post: (payload: unknown, token: string): Promise<T> => {
    return nodeAxiosClient.post(`${resource}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  update: (
    id: number | string,
    payload: unknown,
    token: string
  ): Promise<T> => {
    return nodeAxiosClient.put(`/api/${resource}/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  delete: (id: number | string, token: string): Promise<T> => {
    return nodeAxiosClient.delete(`/api/${resource}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
});
