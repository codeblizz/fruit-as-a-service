import utils from "@/packages/helpers/src/utils";
import { URLResource } from "@/packages/types/src/utils.type";
import AuthRepository from "@/packages/repository/src/auth.repository";
import FruitRepository from "@/packages/repository/src/fruit.repository";
import UserRepository from "@/packages/repository/src/user.repository";

export default function RepositoryFactory() {
  return {
    get: (name: string) => {
      switch (name) {
        case URLResource.SIGNIN:
        case URLResource.SIGNUP:
        case URLResource.VERIFY_TOKEN:
          return AuthRepository(name);
        case URLResource.USER:
          return UserRepository(name);
        case URLResource.FRUITS:
        case URLResource.ORIGINS:
        case URLResource.FRUIT_INVENTORY:
        case URLResource.FRUIT_CATEGORIES:
          return FruitRepository(name);
        default:
          throw utils.customError(`url resource -- ${name} not recognized`);
      }
    },
  };
}
