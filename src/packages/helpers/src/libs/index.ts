import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

const lib = {
  cn: (...args: ClassValue[]) => {
    return twMerge(clsx(args));
  },
};

export default lib;
