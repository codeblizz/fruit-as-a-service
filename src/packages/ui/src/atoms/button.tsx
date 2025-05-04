"use client";

import React from "react";
import { Spinner } from "@radix-ui/themes";
import lib from "@/packages/helpers/src/libs"; 
import { TButton } from "@/packages/types/src/ui/button.type";

function Button({ className, text, name, type, loader }: TButton) {
  return (
    <button
      name={name}
      type={type}
      aria-label={loader ? `loading button` : undefined}
      className={lib.cn([
        "rounded-lg py-2 px-5 h-12 cursor-pointer bg-tertiary text-primary-text",
        className,
      ])}
    >
      {loader ? <Spinner className="p-1 size-[60%] md:size-[80%] animate-spin" /> : text}
    </button>
  );
}

export default Button;
