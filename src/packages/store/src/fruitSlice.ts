import { StateCreator } from "zustand";
import {
  FruitCategory,
  FruitFormData,
  FruitInventory,
} from "@/packages/helpers/src/validations/fruits.validate";
import { FruitDetails } from "@/packages/types/src/fruits.type";

export interface TFruitState {
  fruits: Array<FruitDetails>;
  inventories: FruitInventory[];
  categories: FruitCategory[];
  addFruit: (fruit: FruitDetails) => void;
  updateFruits: (fruit: FruitDetails[]) => void;
  updateFruitInventories: (inventories: FruitInventory[]) => void;
  updateFruitCategories: (categories: FruitCategory[]) => void;
  removeFruit: (fruitId: string) => void;
}

export const defaultFruitState: FruitDetails = {
  botanicalName: "",
  commonName: "",
  originCountry: "",
  description: "",
  currentStock: 0,
  categoryName: "",
  rating: 0,
  fruitId: "",
  images: [{ imageUrl: "" }],
  inventory: [{
    status: "OUT_OF_STOCK",
    createdAt: "",
    inventoryId: "",
    quantityReserved: 0,
    updatedAt: "",
    unitPrice: 0.0,
    harvestDate: "",
    expiryDate: "",
    supplier: "",
    batchNumber: "",
    quantityAvailable: 0,
  }]
};

export const FruitSlice: StateCreator<TFruitState> = (set) => ({
  fruits: [defaultFruitState],
  categories: [
    {
      name: "",
      kinds: [""],
      description: "",
    },
  ],
  inventories: [],
  addFruit: (fruit: FruitDetails) =>
    set((state) => ({
      ...state,
      fruits: [...state.fruits, fruit],
    })),
  updateFruits: (newFruits: FruitDetails[]) =>
    set((state) => ({
      ...state,
      fruits: newFruits,
    })),
  updateFruitInventories: (newInventories: FruitInventory[]) =>
    set((state) => ({
      ...state,
      inventories: newInventories,
    })),
  updateFruitCategories: (newCategories: FruitCategory[]) =>
    set((state) => ({
      ...state,
      categories: newCategories,
    })),
  removeFruit: () => set(() => ({ fruits: [defaultFruitState] })),
});
