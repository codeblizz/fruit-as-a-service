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
      className="fixed overscroll-contain z-50 border border-plum h-16 w-full px-2 flex justify-between items-center"
    >
      <NextLink className="cursor-pointer w-[10%] h-[60%] md:h-[70%] min-w-[60px] max-w-[100px] [mask-image:radial-gradient(circle,rgba(0,0,0,1)_80%,transparent_100%)]" href="/">
        <NextImage
          alt="logo"
          width={100}
          height={100}
          priority={true}
          className="h-full w-full"
          src="/images/faas-512x512.png"
        />
      </NextLink>
      <Paragraph className="text-tertiary-text capitalize" text={pathname.replaceAll("/", " ")} />
      <ThemeToggle className="flex justify-center items-center" />
    </Nav>
  );
}

export default NavBar;
