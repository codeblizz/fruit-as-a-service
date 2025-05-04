import ClientMainRepository from "./mainRepository/client.repository";

const baseUrl = "";

export default function HomeRepository<T>() {

    const clientMainRepository = ClientMainRepository<T>(baseUrl);

    return Object.assign({}, clientMainRepository, {

    })
}