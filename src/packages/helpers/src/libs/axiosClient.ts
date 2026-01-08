"use client";

import { getSession } from "next-auth/react";
import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

export default function createAxiosClient(): AxiosInstance {
  const axiosInstance = axios.create({
    timeout: 60000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const interceptor = async (config: AxiosRequestConfig) => {
    if (config.skipAuth) {
      return config as InternalAxiosRequestConfig;
    }

    config.headers = config.headers || {};
    const session = await getSession();
    const accessToken = (session as any)?.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config as InternalAxiosRequestConfig;
  };

  axiosInstance.interceptors.request.use(interceptor, (error: AxiosError) =>
    Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401 && typeof window !== "undefined") {
        window.location.href = "/auth/signin";
      }
      Promise.reject(error);
    }
  );

  return axiosInstance;
}
