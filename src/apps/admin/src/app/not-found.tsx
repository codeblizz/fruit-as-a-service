"use client";

import React from "react";
import { IErrorProps } from "@/packages/types/src/utils.type";
import AppNotFound from "@/packages/ui/src/molecules/appNotFound";

function NotFound({ error, reset }: IErrorProps) {
  return <AppNotFound error={error} reset={reset} />;
}

export default NotFound;
