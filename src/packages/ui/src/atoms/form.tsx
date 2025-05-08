"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import { TForm } from "@/packages/types/src/ui/form.type";

function Form({ name, children, className, onSubmit }: TForm) {
  return (
    <form
      name={name}
      onSubmit={onSubmit}
      className={lib.cn([
        "border border-plum rounded-lg p-10 bg-gradient-to-br from-quaternary via-guava to-yellow-100",
        className
      ])}
    >
      {children}
    </form>
  );
}

export default Form;
