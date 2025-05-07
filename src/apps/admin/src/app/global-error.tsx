"use client";

import { ErrorProps } from "@/packages/types/src/utils.type";
import AppGlobalError from "@/packages/ui/src/molecules/appGlobalError";

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <AppGlobalError error={error} reset={reset} />
  );
}
