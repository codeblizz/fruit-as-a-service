import { Express } from "express";
import { EnvType } from "@/helpers/env";

declare global {
  namespace Axios {
    export interface AxiosError {
      error: {
        response: {
          status: number;
          data: {
            name?: string;
            message?: string;
            statusCode?: number;
          };
        };
      };
    }

    export interface AxiosRequestConfig {
      headers: {
        baseURL: string;
        Authorization: string;
        withCredentials: boolean;
      };
      _retry?: boolean;
    }
  }

  module "next" {
    export interface NextApiRequest {
      language: string;
      file: Express.Multer.File;
    }
  }

  namespace NodeJS {
    export interface ProcessEnv extends EnvType {
      NEXT_NODE_ENV?: string;
    }
  }

  export interface Window {
    paypal?: {
      Buttons: (config: any) => { render: (element: HTMLElement) => void };
    };
  }
}
