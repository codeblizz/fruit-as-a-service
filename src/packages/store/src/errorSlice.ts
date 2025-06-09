import { StateCreator } from "zustand";
import { IAppReturnType } from "@/packages/types/src/utils.type";

export type ErrorType = IAppReturnType | Record<string, string>;

export type ErrorState = {
  error: ErrorType;
  clearError: () => void;
  updateError: (error: ErrorType) => void;
};

export const ErrorSlice: StateCreator<ErrorState> = (set) => ({
  error: {} as ErrorType,
  updateError: (error: ErrorType) => {
    set((state) => ({
      ...state,
      error: error,
    }));
  },
  clearError: () =>
    set(() => ({ error: {} })),
});
