"use client";

import React from "react";
import Nav from "@/packages/ui/src/atoms/nav";
import { usePathname } from "next/navigation";
import NextLink from "@/packages/ui/src/atoms/link";
import NextImage from "@/packages/ui/src/atoms/image";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import { ThemeToggle } from "@/packages/providers/src/theme.provider";

function NavBar() {
  const pathname = usePathname();
  return (
    <Nav
      className="fixed overscroll-contain z-50 border h-16 w-full px-2 flex justify-between items-center"
    >
      <NextLink className="cursor-pointer" href="/">
        <NextImage
          alt="logo"
          width={120}
          height={80}
          priority={true}
          className="size-auto"
          src="/images/faas-512x512.png"
        />
      </NextLink>
      <Paragraph className="text-primary-blue capitalize" text={pathname.replaceAll("/", " ")} />
      <ThemeToggle className="flex justify-center items-center" />
    </Nav>
  );
}

export default NavBar;
