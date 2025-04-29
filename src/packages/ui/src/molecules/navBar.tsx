"use client";

import React from "react";
import Nav from "@/packages/ui/src/atoms/nav";
import NextLink from "@/packages/ui/src/atoms/link";
import NextImage from "@/packages/ui/src/atoms/image";
import { ThemeToggle } from "@/packages/providers/src/theme.provider";

function NavBar() {
  return (
    <Nav
      className="fixed overscroll-contain z-50 border h-16 w-full px-2 flex justify-between items-center"
    >
      <NextLink className="cursor-pointer h-auto" href="/">
        <NextImage
          alt="logo"
          width={120}
          height={80}
          priority={true}
          className="size-auto"
          src="/images/faas-512x512.png"
        />
      </NextLink>
      <ThemeToggle className="flex justify-center items-center" />
    </Nav>
  );
}

export default NavBar;
