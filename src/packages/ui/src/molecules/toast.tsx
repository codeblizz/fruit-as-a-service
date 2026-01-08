"use client";

import React, { useEffect } from "react";
import { cn } from "@/packages/helpers/src/utils";
import { useCreateStore } from "@/packages/store/src";

function Toast() {
  const { toast, clearToast } = useCreateStore((state) => state);
  const { isOpen, message, className } = toast || {};

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && message) {
      timer = setTimeout(() => {
        clearToast();
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, message, clearToast]);

  if (isOpen && message) {
    return (
      <div
        className={cn([
          "transition duration-200 ease-in-out overflow-hidden font-bold text-center fixed min-w-28 max-w-48 bg-ghost-apple text-wrap h-10 z-50 bottom-1 right-1 p-2 rounded-md",
          className,
        ])}
      >
        <p className={cn("w-full px-2 text-xs", className)}>{message}</p>
      </div>
    );
  }
  return null;
}

export default Toast;
