import { StateCreator } from "zustand";
import { ToastState } from "@/packages/types/src/utils.type";

export const ToastSlice: StateCreator<ToastState> = (set) => ({
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
