import { IClientMainRepository } from "@/packages/types/src/repository.type";

// App Project User type
export type AppUser = {
  email: string;
  firstName: string;
  lastName: string;
  termsAccepted: boolean;
  profileImageUrl: string;
  roles: Array<string>;
  businessName: string;
  isActive: boolean;
  isVerified: boolean;
  permissions?: Array<string>;
};

// Omitting `type` property for user details
export type TUserDetail = Omit<AppUser, "permissions">;

// Represents the zustand state of a single user
export type TUserState = {
  user: TUserDetail;
  clearUser: () => void;
  updateUser: (user: TUserDetail) => void;
};

// User Domain Interface
export interface IUserInterface extends IClientMainRepository {
  fetchUserById: (userId: string) => Promise<AppUser>;
  fetchAllUser: () => Promise<Array<AppUser>>;
}
