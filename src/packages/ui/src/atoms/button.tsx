"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";
import lib from "@/packages/helpers/src/libs"; 
import { IButton } from "@/packages/types/src/ui/button.type";

function Button({ className, onClick, children, name, type, isPending }: IButton) {
  return (
    <button
      name={name}
      type={type}
      onClick={onClick}
      aria-label={isPending ? `loading button` : undefined}
      className={lib.cn([
        "rounded-lg py-2 px-5 h-12 cursor-pointer inline-flex flex-row items-center justify-center text-center bg-primary text-primary-text",
        className,
      ])}
    >
      {isPending ? <LoaderCircle className="inline-flex justify-center items-center animate-spin size-6" /> : children}
    </button>
  );
}

export default Button;
