import { StateCreator } from "zustand";

import CONSTANT from "@/packages/helpers/src/constants";
import { TUserDetail, TUserState } from "@/packages/types/src/auth.type";

export const UserSlice: StateCreator<TUserState> = (set) => ({
  user: { ...CONSTANT.defaultUser },
  updateUser: (user: TUserDetail) =>
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        ...user,
      },
    })),
  clearUser: () => set(() => ({ user: { ...CONSTANT.defaultUser } })),
});
