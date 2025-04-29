import env from "@/packages/config/env";
import { getServerSession } from "next-auth";
import { authOptions } from "@/packages/auth/src/authOptions";
import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// Function to create Axios clients with interceptors
export const createAxiosClients = async () => {
  // Configuration for Axios clients
  const config = {
    timeout: 30000,
    withCredentials: true,
  };
  const nodeAxiosClient = axios.create({
    ...config,
    baseURL: env.JAVA_AUTH_URL,
  });
  const nextAuthAxiosClient = axios.create({
    ...config,
    baseURL: env.NEXT_AUTH_URL,
  });

  // Interceptor for adding Authorization header
  const interceptor = async (config: AxiosRequestConfig) => {
    config.headers = config.headers || {};
    const session = await getServerSession(authOptions);
    if (session?.accessToken) {
     config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return config as InternalAxiosRequestConfig;
  };

  // Set up request interceptors
  nextAuthAxiosClient.interceptors.request.use(
    interceptor,
    (error: AxiosError) => Promise.reject(error)
  );

  nodeAxiosClient.interceptors.request.use(interceptor, (error: AxiosError) =>
    Promise.reject(error)
  );

  // Set up response interceptors
  nextAuthAxiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  nodeAxiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  return { nodeAxiosClient, nextAuthAxiosClient };
};
