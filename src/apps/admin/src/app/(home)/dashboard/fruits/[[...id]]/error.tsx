"use client";

import React from "react";
import Error from "@/packages/ui/src/molecules/appError";
import { IErrorProps } from "@/packages/types/src/utils.type";
function ErrorPage({ error, reset }: IErrorProps) {
  return <Error error={error} reset={reset} />;
}

export default ErrorPage;
