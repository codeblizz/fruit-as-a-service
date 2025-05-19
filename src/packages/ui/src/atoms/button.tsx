"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";
import lib from "@/packages/helpers/src/libs"; 
import { TButton } from "@/packages/types/src/ui/button.type";

function Button({ className, onClick, text, name, type, isPending }: TButton) {
  return (
    <button
      name={name}
      type={type}
      onClick={onClick}
      aria-label={isPending ? `loading button` : undefined}
      className={lib.cn([
        "rounded-lg py-2 px-5 h-12 cursor-pointer bg-tertiary text-primary-text",
        className,
      ])}
    >
      {isPending ? <LoaderCircle className="animate-spin size-6" /> : text}
    </button>
  );
}

export default Button;
