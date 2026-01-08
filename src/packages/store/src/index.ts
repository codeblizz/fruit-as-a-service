import { createStore, useStore as useZustandStore } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

// import env from "@/packages/config/env";
import { UserSlice } from "./userSlice";
import { ToastSlice } from "./toastSlice";
import utils from "@/packages/helpers/src/utils";
import { ThemeSlice, ThemeState } from "./themeSlice";
import { ModalSlice, ModalState } from "./modalSlice";
import { ErrorSlice, IErrorState } from "./errorSlice";
import { TFruitState, FruitSlice } from "./fruitSlice";
import { LoaderSlice, LoaderState } from "./loaderSlice";
import { TUserState } from "@/packages/types/src/user.type";
import { CountrySlice, TCountryState } from "./countrySlice";
import { TToastState } from "@/packages/types/src/utils.type";
import { useZustandContext } from "@/packages/providers/src/store.provider";
import {
  DashboardSlice,
  DashboardState,
} from "./dashboardSlice";

// Define the combined Store type
export type Store = TUserState &
  TToastState &
  ThemeState &
  LoaderState &
  ModalState &
  TFruitState &
  IErrorState &
  TCountryState &
  DashboardState;

// Initialize the Zustand store
export const initializeStore = (preloadedState: Partial<Store> = {}) => {
  return createStore<Store>()(
    devtools(
      persist(
        (set, get, api) => ({
          ...preloadedState,
          ...UserSlice(set, get, api),
          ...ThemeSlice(set, get, api),
          ...ToastSlice(set, get, api),
          ...LoaderSlice(set, get, api),
          ...ModalSlice(set, get, api),
          ...CountrySlice(set, get, api),
          ...DashboardSlice(set, get, api),
          ...ErrorSlice(set, get, api),
          ...FruitSlice(set, get, api),
        }),
        {
          name: "app-store",
          storage: createJSONStorage(() => localStorage),
          // partialize: (state) => ({ error: state.error, user: state.user }),
        }
      ),
      {
        enabled: process.env.PUBLIC_NEXT_ENV !== "production",
      }
    )
  );
};

export type StoreType = ReturnType<typeof initializeStore>;

// Custom hook to access the Zustand store using context
export const useCreateStore = <T>(selector: (store: Store) => T): T => {
  const store = useZustandContext();
  if (!store) {
    throw utils.customError(
      "useCreateStore must be used within a ZustandProvider"
    );
  }
  return useZustandStore(store, selector);
};
