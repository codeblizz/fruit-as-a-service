"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";

interface NavType extends React.HTMLAttributes<HTMLElement> {}

function Nav({ children, className }: NavType) {
  return <nav className={lib.cn(["bg-quaternary", className])}>{children}</nav>;
}

export default Nav;
