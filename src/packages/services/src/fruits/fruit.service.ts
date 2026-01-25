import { AxiosResponse } from "axios";
import { FruitDetails, IFruitInterface } from "@/packages/types/src/fruits.type";
import { IApiResponseData } from "@/packages/types/src/utils.type";
import FruitRepository from "@/packages/repository/src/fruit.repository";
import RepositoryFactory from "@/packages/repository/src/factory.repository";
import {
  FruitFormData,
  FruitCategory,
  FruitInventory,
} from "@/packages/helpers/src/validations/fruits.validate";

export default function FruitService<T>(urlResource: string) {
  let api: IFruitInterface;
  const fruitRepository = FruitRepository<T>(urlResource);
  api = RepositoryFactory().get(urlResource) as unknown as IFruitInterface;

  return {
    ...fruitRepository,
    fetchAllFruits: async (): Promise<
      AxiosResponse<IApiResponseData<FruitDetails[]>>
    > => {
      return await api.fetchAllFruits();
    },

    fetchOneFruitById: async (
      fruitId: string
    ): Promise<AxiosResponse<IApiResponseData<FruitDetails>>> => {
      return await api.fetchOneFruitById(fruitId);
    },

    fetchAllFruitByCategory: async (
      categoryId: string
    ): Promise<AxiosResponse<IApiResponseData<FruitDetails[]>>> => {
      return await api.fetchAllFruitByCategory(categoryId);
    },

    fetchFruitCategories: async (): Promise<
      AxiosResponse<IApiResponseData<FruitCategory[]>>
    > => {
      return await api.fetchFruitCategories();
    },

    addNewFruit: async (
      data: FormData
    ): Promise<AxiosResponse<IApiResponseData<FruitDetails>>> => {
      return await api.addNewFruit(data);
    },

    createFruitCategory: async (
      data: FruitCategory
    ): Promise<AxiosResponse<IApiResponseData<unknown>>> => {
      return await api.createFruitCategory(data);
    },

    fetchAllFruitInventories: async (): Promise<
      AxiosResponse<IApiResponseData<FruitInventory[]>>
    > => {
      return await api.fetchAllFruitInventories();
    },

    getFruitOriginList: async (): Promise<unknown> => {
      return await api.getFruitOriginList();
    },

    removeFruit: async (
      fruitId: string
    ): Promise<AxiosResponse<IApiResponseData<unknown>>> => {
      return await api.removeFruit(fruitId);
    },
  };
}
