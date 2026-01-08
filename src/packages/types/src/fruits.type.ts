import { AxiosResponse } from "axios";
import { IApiResponseData } from "./utils.type";
import { IClientMainRepository } from "./repository.type";
import {
  FruitCategory,
  FruitFormData,
  FruitInventory,
} from "@/packages/helpers/src/validations/fruits.validate";

export interface IFruitItem {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
}

export interface FruitValues
  extends Iterable<[keyof FruitFormData, any]>,
    FruitFormData {
  [Symbol.toStringTag]: string;
}

export interface IPriceCardDetails {
  title: string;
  edit: boolean;
  price: number;
  rating: number;
  cardNo: string;
  imageSrc: string;
  isLoading: boolean;
  sellerName: string;
  description: string;
  onSave: (data: TPriceCardDetails) => void;
  onEditOrCancel: (
    e: React.MouseEvent<HTMLButtonElement>,
    data: TPriceCardDetails
  ) => void;
}

export type TPriceCardDetails = Omit<
  IPriceCardDetails,
  "onEditOrCancel" | "onSave" | "edit" | "isLoading"
>;

export type TLeftSideDashboard = {
  className: string;
  dashboardMenu: Array<string>;
};

export interface IFruitInterface extends IClientMainRepository {
  addNewFruit: (
    fruit: FormData
  ) => Promise<AxiosResponse<IApiResponseData<FruitFormData>>>;
  removeFruit: (
    frutiId: string
  ) => Promise<AxiosResponse<IApiResponseData<unknown>>>;
  getFruitOriginList: () => Promise<unknown>;
  fetchAllFruitInventories: () => Promise<
    AxiosResponse<IApiResponseData<FruitInventory[]>>
  >;
  fetchAllFruitByCategory: (
    categoryId: string
  ) => Promise<AxiosResponse<IApiResponseData<FruitFormData[]>>>;
  fetchOneFruitById: (
    fruitId: string
  ) => Promise<AxiosResponse<IApiResponseData<FruitFormData>>>;
  fetchAllFruits: () => Promise<
    AxiosResponse<IApiResponseData<FruitFormData[]>>
  >;
  fetchFruitCategories: () => Promise<
    AxiosResponse<IApiResponseData<FruitCategory[]>>
  >;
  createFruitCategory: (
    data: FruitCategory
  ) => Promise<AxiosResponse<IApiResponseData<string>>>;
}
