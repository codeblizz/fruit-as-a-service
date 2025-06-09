import { createStore, useStore as useZustandStore } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

// import env from "@/packages/config/env";
import utils from "@/packages/helpers/src/utils";
import { UserSlice } from "@/packages/store/src/userSlice";
import { TUserState } from "@/packages/types/src/auth.type";
import { TToastState } from "@/packages/types/src/utils.type";
import { ToastSlice } from "@/packages/store/src/toastSlice";
import { LoaderSlice } from "@/packages/store/src/loaderSlice";
import { LoaderState } from "@/packages/store/src/loaderSlice";
import { MiscSlice, MiscState } from "@/packages/store/src/miscSlice";
import { ThemeSlice, ThemeState } from "@/packages/store/src/themeSlice";
import { ErrorSlice, ErrorState } from "@/packages/store/src/errorSlice";
import { ModalSlice, ModalState } from "@/packages/store/src/modalSlice";
import { useZustandContext } from "@/packages/providers/src/store.provider";

// Define the combined Store type
export type Store = TUserState &
  TToastState &
  ThemeState &
  ErrorState &
  LoaderState &
  ModalState &
  MiscState;

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
          ...ErrorSlice(set, get, api),
          ...LoaderSlice(set, get, api),
          ...ModalSlice(set, get, api),
          ...MiscSlice(set, get, api),
        }),
        {
          name: "app-store",
          storage: createJSONStorage(() => localStorage),
          // partialize: (state) => ({ error: state.error, user: state.user }),
        }
      ),
      {
        enabled: process.env.PUBLIC_NEXT_ENV !== "production"
      }
    ),
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
