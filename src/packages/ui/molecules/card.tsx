"use client";

import React from "react";
import lib from "@/packages/helpers/lib";
import Fragment from "@/packages/ui/atoms/fragment";
import { TBaseElement } from "@/packages/types/ui/base.type";

export interface CardType extends TBaseElement {}

function Card({ className, children, id, name }: CardType) {
  return (
    <Fragment
      id={id}
      name={name}
      className={lib.cn(
        "border border-slate-100 size-full bg-quaternary shadow-gray-300 shadow-md",
        className
      )}
    >
      {children}
    </Fragment>
  );
}

export default Card;
