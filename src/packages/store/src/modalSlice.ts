import { StateCreator } from "zustand";

export type ModalType = {
  title: string;
  isOpen: boolean;
  message: string;
  status: boolean;
};

export type ModalState = {
  modal: ModalType;
  clearModal: () => void;
  updateModal: (error: ModalType) => void;
};

export const ModalSlice: StateCreator<ModalState> = (set) => ({
  modal: {
    title: "",  
    message: "",
    isOpen: false,
    status: false,
  },
  updateModal: (modal: ModalState["modal"]) => {
    set((state) => ({
      ...state,
      modal,
    }));
  },
  clearModal: () =>
    set(() => ({
      modal: { isOpen: false, title: "", message: "", status: false },
    })),
});
