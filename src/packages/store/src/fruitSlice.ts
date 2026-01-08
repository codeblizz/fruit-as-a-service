import { StateCreator } from "zustand";
import {
  FruitCategory,
  FruitFormData,
  FruitInventory,
} from "@/packages/helpers/src/validations/fruits.validate";

export interface TFruitState {
  fruits: FruitFormData[];
  inventories: FruitInventory[];
  categories: FruitCategory[];
  addFruit: (s: FruitFormData) => void;
  updateFruits: (fruit: FruitFormData[]) => void;
  updateFruitInventories: (inventories: FruitInventory[]) => void;
  updateFruitCategories: (categories: FruitCategory[]) => void;
  removeFruit: (fruitId: string) => void;
}

const defaultFruitState: FruitFormData = {
  botanicalName: "",
  commonName: "",
  originCountry: "",
  description: "",
  unitPrice: 0.0,
  initialStock: 0,
  harvestDate: "",
  expiryDate: "",
  batchNumber: "",
  supplier: "",
  categoryName: "",
  images: [],
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
  addFruit: (fruit: FruitFormData) =>
    set((state) => ({
      ...state,
      fruits: [...state.fruits, fruit],
    })),
  updateFruits: (newFruits: FruitFormData[]) =>
    set((state) => ({
      ...state,
      fruit: newFruits,
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
