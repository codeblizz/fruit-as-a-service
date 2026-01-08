import { StateCreator } from "zustand";

export interface ThemeState {
  isDark: boolean;
  setDarkTheme: (isDark: boolean) => void;
}

export const ThemeSlice: StateCreator<ThemeState> = (set) => ({
  isDark: false,
  setDarkTheme: (isDark: boolean) => {
    set((state) => ({
      ...state,
      isDark,
    }));
  },
  clearDarkTheme: () =>
    set(() => ({ isDark: false })),
});
