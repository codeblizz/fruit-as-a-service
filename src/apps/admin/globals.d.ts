/// <reference types="next" />
/// <reference types="next/types/global" />
import axios from "axios";

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}
