import { StateCreator } from "zustand";
import { TToastState } from "@/packages/types/src/utils.type";

export const ToastSlice: StateCreator<TToastState> = (set) => ({
  toast: { message: "", isOpen: false, className: "" },
  updateToast: (isOpen: boolean, message: string, className: string) => {
    set((state) => ({
      ...state,
      toast: {
        ...state.toast,
        isOpen,
        message,
        className
      },
    }));
  },
  clearToast: () =>
    set(() => ({ toast: { message: "", isOpen: false, className: "" } })),
});
