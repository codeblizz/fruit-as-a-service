"server-only";

import createAxiosServer from "@/packages/helpers/src/libs/axiosServer";
import { IServerMainRepository } from "@/packages/types/src/repository.type";

export const ServerMainRepository = <T>(
  resource: string
): IServerMainRepository => ({
  get: async (id: string, token: string): Promise<T[]> => {
    const axiosServer = await createAxiosServer();
    return axiosServer.get(`${resource}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  refreshToken: async (token: string): Promise<T[]> => {
    const axiosServer = await createAxiosServer();
    return axiosServer.get(`${resource}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  post: async (payload: unknown, token: string): Promise<T> => {
    const axiosServer = await createAxiosServer();
    return axiosServer.post(`${resource}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  update: async(
    id: number | string,
    payload: unknown,
    token: string
  ): Promise<T> => {
    const axiosServer = await createAxiosServer();
    return axiosServer.put(`/api/${resource}/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  delete: async (id: number | string, token: string): Promise<T> => {
    const axiosServer = await createAxiosServer();
    return axiosServer.delete(`/api/${resource}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
});
