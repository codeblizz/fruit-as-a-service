import { StateCreator } from "zustand";
import { AppReturnType } from "@/packages/types/src/utils.type";

export type ErrorType = AppReturnType | Record<string, string>;

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
