"server only";

import { getServerSession } from "next-auth";
import { authOptions } from "@/packages/auth/src/authOptions";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export default async function createAxiosServer(): Promise<
  Record<string, AxiosInstance>
> {
  const config = {
    timeout: 60000,
    withCredentials: true,
  };

  const backendClient = axios.create({
    ...config,
    baseURL:
      process.env.BACKEND_BASE_URL ||
      "http://localhost:8080/api/fruit-service/v1",
  });

  const proxyClient = axios.create({
    ...config,
    baseURL: "http://localhost:3001",
  });

  let session: any = null;
  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.log("error from getServerSession", e);
    console.warn("AxiosServer: Called outside of a request scope.");
  }

  // Interceptor for adding Authorization header
  const interceptor = async (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};
    if (session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return config;
  };

  [proxyClient, backendClient].forEach((client) => {
    client.interceptors.request.use(interceptor, (error: AxiosError) =>
      Promise.reject(error)
    );

    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  });

  return { backendClient, proxyClient };
}
