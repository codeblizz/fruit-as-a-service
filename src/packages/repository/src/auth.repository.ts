import utils from "@/packages/helpers/src/utils";
import { TSignIn, TSignUp } from "@/packages/types/src/auth.type";
import createAxiosClients from "@/packages/helpers/src/libs/axiosClients";
import ClientMainRepository from "@/packages/repository/src/mainRepository/client.repository";

// Create and Destructure Axios Clients Instance
const { nextAxiosClient } = createAxiosClients();

export default function AuthRepository<T>(urlResource: string) {

    if(!utils.isTUnionFromURLResource(urlResource)) return `url resource -- ${urlResource} not recognized`;
    const clientMainRepository = ClientMainRepository<T>(urlResource);

    return Object.assign({}, clientMainRepository, {
        signIn: async (payload: TSignIn) => {
            return await nextAxiosClient.post("/api/signin", { ...payload });
        },
        signUp: async (payload: TSignUp) => {
            return await nextAxiosClient.post("/api/signup", { ...payload });
        },
        getRefreshToken: async (payload: any) => {
            return await nextAxiosClient.get("/api/refreshToken", { ...payload });
        }
    })
}