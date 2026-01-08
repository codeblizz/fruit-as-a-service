import { StateCreator } from "zustand";

export type DashboardType = {
  isAccordionOpen: boolean;
  activeTab: string;
  isMobileOpen: boolean;
};

export type DashboardState = {
  dashboard: DashboardType;
  clearOpenClose: () => void;
  setActiveTab: (tab: string) => void;
  setMobileOpen: (isMobileOpen: boolean) => void;
  setOpenClose: (isAccordionOpen: boolean) => void;
};

export const DashboardSlice: StateCreator<DashboardState> = (set) => ({
  dashboard: {
    isAccordionOpen: false,
    activeTab: "overview",
    isMobileOpen: false,
  },
  setMobileOpen: (isMobileOpen: boolean) => {
    set((state) => ({
      ...state,
      dashboard: {
        ...state.dashboard,
        isMobileOpen,
      },
    }));
  },
  setOpenClose: (isAccordionOpen: boolean) => {
    set((state) => ({
      ...state,
      dashboard: {
        ...state.dashboard,
        isAccordionOpen,
      },
    }));
  },
  setActiveTab(tab: string) {
    set((state) => ({
      ...state,
      dashboard: {
        ...state.dashboard,
        activeTab: tab,
      },
    }));
  },
  clearOpenClose: () =>
    set(() => ({
      dashboard: {
        isAccordionOpen: false,
        activeTab: "overview",
        isMobileOpen: true,
      },
    })),
});
