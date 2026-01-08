"use client";

import { IErrorProps } from "@/packages/types/src/utils.type";
import AppGlobalError from "@/packages/ui/src/molecules/appGlobalError";

export default function GlobalError({ error, reset }: IErrorProps) {
  return (
    <AppGlobalError error={error} reset={reset} />
  );
}
