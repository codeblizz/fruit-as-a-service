import { StateCreator } from "zustand";

export type MiscType = {
  misc: { isAccordionOpen: boolean };
};

export type MiscState = {
  misc: { isAccordionOpen: boolean };
  clearOpenClose: () => void;
  setOpenClose: (isAccordionOpen: boolean) => void;
};

export const MiscSlice: StateCreator<MiscState> = (set) => ({
  misc: {
    isAccordionOpen: false,
  },
  setOpenClose: (isAccordionOpen: boolean) => {
    set((state) => ({
      ...state,
      isAccordionOpen,
    }));
  },
  clearOpenClose: () =>
    set(() => ({
      misc: {
        isAccordionOpen: false,
      },
    })),
});
