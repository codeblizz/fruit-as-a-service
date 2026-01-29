import { StateCreator } from "zustand";
import {
  FruitCategory,
  FruitFormData,
  FruitInventory,
} from "@/packages/helpers/src/validations/fruits.validate";
import { FruitDetails } from "@/packages/types/src/fruits.type";

export interface TFruitState {
  fruits: Array<FruitDetails>;
  favorites: Set<string>;
  totalAmounts: number;
  totalItems: number;
  inventories: FruitInventory[];
  categories: FruitCategory[];
  cart: { [key: string]: number };
  getTotalAmount: () => void;
  getTotalItems: () => void;
  addToCart: (fruitId: string) => void;
  toggleFavorites: (fruitId: string) => void;
  removeFromCart: (fruitId: string) => void;
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
  reviews: 0,
  isOrganic: false,
  isLocallyGrown: false,
  benefits: [""],
  categoryName: "",
  rating: 0,
  fruitId: "",
  images: [{ imageUrl: "", id: 0 }],
  inventory: [
    {
      status: "OUT_OF_STOCK",
      createdAt: "",
      inventoryId: "",
      quantityReserved: 0,
      updatedAt: "",
      unitPrice: 0.0,
      packagingUnit: "KG",
      harvestDate: "",
      expiryDate: "",
      supplier: "",
      batchNumber: "",
      quantityAvailable: 0,
    },
  ],
};

export const FruitSlice: StateCreator<TFruitState> = (set, get) => ({
  fruits: [defaultFruitState],
  cart: {},
  totalAmounts: 0,
  totalItems: 0,
  favorites: new Set<string>(""),
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
  addToCart: (fruitId: string) => set((state) => {
    // toast.success("Added to cart!", {
    //   icon: "🛒",
    //   duration: 2000,
    // });
    return ({
      ...state,
      cart: { ...state.cart, [fruitId]: (state.cart[fruitId] || 0) + 1 },
    })
  }),
  toggleFavorites: (fruitId: string) => set((state) => {
    if (state.favorites.has(fruitId)) {
      state.favorites.delete(fruitId);
      // toast("Removed from favorites", { icon: "💔" });
    } else {
      state.favorites.add(fruitId);
      // toast("Added to favorites!", { icon: "❤️" });
    }
    return ({
      ...state,
      favorites: new Set(state.favorites),
    })
  }),
  getTotalAmount: () => { 
    const cart = get().cart;
    const fruits = get().fruits;
    let total = 0;
    for (const fruitId in cart) {
      const fruit = fruits.find((f) => f.fruitId === fruitId);
      if (fruit) {
        const inventory = fruit.inventory[0]; // Assuming using the first inventory item
        total += ((inventory.unitPrice || 0.0) * cart[fruitId]);
      }
    }

    // Object.entries(cart).reduce((total, [fruitId, quantity]) => {
    //   const fruit = enhancedFruits.find((f) => f.id === fruitId);
    //   return total + (fruit?.price || 0) * quantity;
    // }, 0);

    set({
      totalAmounts: total,
    });
  },
  getTotalItems: () => { 
    const cart = get().cart;
    let itemCount = 0;
    // Object.values(cart).reduce((total, quantity) => total + quantity, 0);
    for (const fruitId in cart) {
      itemCount += cart[fruitId];
    }
    set({
      totalItems: itemCount,
    });
  },
  removeFromCart: (fruitId: string) => 
    set((state) => {
      // setCart((prev) => {
      //   const newCart = { ...prev };
      //   if (newCart[fruitId] > 1) {
      //     newCart[fruitId]--;
      //   } else {
      //     delete newCart[fruitId];
      //   }
      //   return newCart;
      // });
      const currentCount = state.cart[fruitId] || 0;
      const newCart = { ...state.cart };
      if (currentCount <= 1) {
        delete newCart[fruitId];
      } else {
        newCart[fruitId] = currentCount - 1;
      }
      return { ...state, cart: newCart };
    }),
    
  removeFruit: () => set(() => ({ fruits: [defaultFruitState] })),
});
