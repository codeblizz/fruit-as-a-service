import { StateCreator } from "zustand";

export type LoaderState = {
  loader: boolean;
  setLoader: (loader: boolean) => void;
};

export const LoaderSlice: StateCreator<LoaderState> = (set) => ({
  loader: false,
  setLoader: (loader: boolean) => {
    set((state) => ({
      ...state,
      loader,
    }));
  },
});
