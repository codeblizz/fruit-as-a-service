import { StateCreator } from "zustand";

import CONSTANT from "@/packages/helpers/src/constants";
import { UserDetail, UserState } from "@/packages/types/src/auth.type";

export const UserSlice: StateCreator<UserState> = (set) => ({
  user: { ...CONSTANT.defaultUser },
  updateUser: (user: UserDetail) =>
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        ...user,
      },
    })),
  clearUser: () => set(() => ({ user: { ...CONSTANT.defaultUser } })),
});
