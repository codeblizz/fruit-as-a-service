import { MouseEventHandler } from "react";

export interface IFruitItem {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
}

export interface IPriceCardDetails {
  title: string;
  edit: boolean;
  price: number;
  rating: number;
  cardNo: string;
  isLoading: boolean;
  sellerName: string;
  description: string;
  onSave: (data: TPriceCardDetails) => void;
  onEditOrCancel: MouseEventHandler<HTMLButtonElement>;
};

export type TPriceCardDetails = Omit<IPriceCardDetails, "onEditOrCancel" | "onSave" | "cardNo" | "edit" | "isLoading">;

export type TLeftSideDashboard = {
  className: string;
  dashboardMenu: Array<string>;
};
