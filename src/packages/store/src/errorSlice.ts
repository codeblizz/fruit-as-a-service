import { StateCreator } from "zustand";
import { TErrorDetails } from "@/packages/types/src/utils.type";

export interface IErrorState {
  appError: TErrorDetails | null;
  setAppError: (eror: TErrorDetails) => void;
  clearAppError: () => void;
}

export const ErrorSlice: StateCreator<IErrorState> = (set) => ({
  appError: {
    statusCode: 500,
    message: "",
    status: false,
  },
  setAppError: (appError: TErrorDetails) =>
    set((state) => ({
      ...state,
      appError: {
        ...state.appError,
        ...appError,
      },
    })),
  clearAppError: () => set(() => ({ appError: null })),
});
