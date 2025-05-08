"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import Fragment from "@/packages/ui/src/atoms/fragment";
import { TBaseElement } from "@/packages/types/src/ui/base.type";

export interface CardType extends TBaseElement {}

function Card({ className, children, id, name }: CardType) {
  return (
    <Fragment
      id={id}
      name={name}
      className={lib.cn(
        "border border-plum size-full bg-gradient-to-br from-quaternary via-guava to-yellow-100 shadow-gray-300 shadow-md",
        className
      )}
    >
      {children}
    </Fragment>
  );
}

export default Card;
