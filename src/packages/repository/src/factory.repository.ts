import utils from "@/packages/helpers/src/utils";
import AuthRepository from "@/packages/repository/src/auth.repository";
import HomeRepository from "@/packages/repository/src/home.repository";
import { URLResource } from "@/packages/types/src/utils.type";

export default function RepositoryFactory() {
  return {
    get: (name: string) => {
      switch (name) {
        case URLResource.SIGNIN:
        case URLResource.SIGNUP:
          return AuthRepository(name);
        case URLResource.HOME:
          return HomeRepository();
        default:
          throw utils.customError(`url resource -- ${name} not recognized`);
      }
    },
  };
}
