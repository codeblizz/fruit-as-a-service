import { StateCreator } from "zustand";

import utils from "@/packages/helpers/src/utils";
import { UserDetail, UserState } from "@/packages/types/src/auth.type";

export const UserSlice: StateCreator<UserState> = (set) => ({
  user: { ...utils.defaultUser },
  updateUser: (user: UserDetail) =>
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        ...user,
      },
    })),
  clearUser: () => set(() => ({ user: { ...utils.defaultUser }}))
});
