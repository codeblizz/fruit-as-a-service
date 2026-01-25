import { AxiosResponse } from "axios";
import axiosServer from "@/packages/helpers/src/libs/axiosServer";
import { IApiResponseData } from "@/packages/types/src/utils.type";
import {
  FruitCategory,
  FruitFormData,
  FruitInventory,
} from "@/packages/helpers/src/validations/fruits.validate";
import ClientMainRepository from "@/packages/repository/src/mainRepository/client.repository";

const partFruitUrl = "/api";

export default function FruitRepository<T>(URLResource: string) {
  const clientMainRepository = ClientMainRepository<T>(URLResource);

  return {
    ...clientMainRepository,
    fetchAllFruits: async (): Promise<
      AxiosResponse<IApiResponseData<FruitFormData[]>>
    > => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.get(`${partFruitUrl}/${URLResource}`);
    },
    fetchOneFruitById: async (
      fruitId: string
    ): Promise<AxiosResponse<IApiResponseData<FruitFormData>>> => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.get(`${partFruitUrl}/${URLResource}?${fruitId}`);
    },
    fetchAllFruitByCategory: async (
      categoryId: string
    ): Promise<AxiosResponse<IApiResponseData<FruitFormData[]>>> => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.get(
        `${partFruitUrl}/fruits/${URLResource}?${categoryId}`
      );
    },
    fetchFruitCategories: async (): Promise<
      AxiosResponse<IApiResponseData<FruitCategory[]>>
    > => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.get(`${partFruitUrl}/fruits/${URLResource}`);
    },
    getFruitOriginList: async (): Promise<AxiosResponse> => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.get(`${partFruitUrl}/fruits/${URLResource}`);
    },
    createFruitCategory: async (
      data: FruitCategory
    ): Promise<AxiosResponse<IApiResponseData<FruitCategory>>> => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.post(
        `${partFruitUrl}/fruits/${URLResource}`,
        data
      );
    },
    addNewFruit: async (
      data: FormData
    ): Promise<AxiosResponse<IApiResponseData<FruitFormData>>> => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.post(`${partFruitUrl}/${URLResource}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    fetchAllFruitInventories: async (): Promise<AxiosResponse<IApiResponseData<FruitInventory[]>>> => {
      const { proxyClient } = await axiosServer();
      return await proxyClient.get(`${partFruitUrl}/fruits/${URLResource}`);
    },
    removeFruit: async (fruitId: string): Promise<void> => {
      const { proxyClient } = await axiosServer();
      await proxyClient.delete(`${partFruitUrl}/${URLResource}/${fruitId}`);
    },
  };
}
