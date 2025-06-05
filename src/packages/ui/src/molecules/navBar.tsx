"use client";

import React from "react";
import Headroom from "react-headroom";
import Fragment from "../atoms/fragment";
import Nav from "@/packages/ui/src/atoms/nav";
import { usePathname } from "next/navigation";
import lib from "@/packages/helpers/src/libs";
import Span from "@/packages/ui/src/atoms/span";
import { useSearchParams } from "next/navigation";
import NextLink from "@/packages/ui/src/atoms/link";
import Section from "@/packages/ui/src/atoms/section";
import NextImage from "@/packages/ui/src/atoms/image";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import { ThemeToggle } from "@/packages/providers/src/theme.provider";

function NavBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Headroom
      pin
      className="w-full fixed z-50 overscroll-contain shadow-md border-b border-plum"
    >
      <Nav className="h-16 min-w-max md:text-clip px-3 flex justify-between items-center">
        <NextLink
          className="cursor-pointer w-[10%] h-[60%] md:h-[70%] min-w-[60px] max-w-[100px] [mask-image:radial-gradient(circle,rgba(0,0,0,1)_80%,transparent_100%)]"
          href="/"
        >
          <NextImage
            alt="logo"
            width={100}
            height={100}
            priority={true}
            className="h-full w-full"
            src="/images/faas-512x512.png"
          />
        </NextLink>
        <Paragraph className="text-tertiary-text capitalize">
          {pathname.includes("/dashboard/fruits")
            ? `${pathname.replace(/\/|dashboard/g, " ")} - ${searchParams.get(
                "selected"
              )}`
            : ""}
        </Paragraph>
        <Section className="inline-flex items-center gap-x-4">
          {["home", "impact", "buyer", "seller"].map((item, index) => (
            <Fragment key={index} className="">
              {index === 0 ? null : (
                <Span name="" className="border-l-2 mr-4 h-3 border-fig"></Span>
              )}
              <NextLink
                href={item === "home" ? "/" : `/fruits/${item}`}
                className={lib.cn([
                  pathname === item ? "text-apple-green" : "text-fig",
                  "capitalize font-medium hover:text-raspberry",
                ])}
              >
                {item}
              </NextLink>
            </Fragment>
          ))}
        </Section>
        <ThemeToggle className="flex justify-center items-center" />
      </Nav>
    </Headroom>
  );
}

export default NavBar;
