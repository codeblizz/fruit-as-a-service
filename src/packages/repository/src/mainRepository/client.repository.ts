import { AxiosRequestConfig } from "axios";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import { IClientMainRepository } from "@/packages/types/src/repository.type";

const ClientMainRepository = <T>(resource: string): IClientMainRepository => ({
  get: async (payload: Record<string, unknown>): Promise<T[]> => {
    const proxyClient = await axiosServer();
    const response = await proxyClient.get(`/api/${resource}`, {
      params: { ...payload },
    });
    return response.data;
  },

  post: async (payload: AxiosRequestConfig<unknown>): Promise<T[]> => {
    const proxyClient = await axiosServer();
    const response = await proxyClient.post(`/api/${resource}`, payload);
    return response.data;
  },

  update: async (id: number | string, payload: AxiosRequestConfig<unknown>): Promise<T> => {
    const proxyClient = await axiosServer();
    const response = await proxyClient.put(
      `/api/${resource}/${id}`,
      payload
    );
    return response.data;
  },

  delete: async (id?: number | string): Promise<T> => {
    const proxyClient = await axiosServer();
    const response = await proxyClient.delete(`/api/${resource}/${id}`);
    return response.data;
  },
});

export default ClientMainRepository;
