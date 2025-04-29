"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import { TButton } from "@/packages/types/src/ui/button.type";

function Button({ className, text, name, type }: TButton) {
  return (
    <button
      name={name}
      className={lib.cn([
        "rounded-lg py-2 px-5 h-12 cursor-pointer bg-tertiary text-primary-text",
        className,
      ])}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
