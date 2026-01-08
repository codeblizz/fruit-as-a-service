"use client"

import Link from "next/link";
import { type LinkProps } from "next/link";
import { LoaderCircle } from "lucide-react";
import lib from "@/packages/helpers/src/libs";
import React, { forwardRef, ReactNode } from "react";
import type { MouseEventHandler, AnchorHTMLAttributes, StyleHTMLAttributes } from "react";

export interface NextLinkType extends AnchorHTMLAttributes<HTMLAnchorElement>, LinkProps {
  href: string;
  asPath?: string;
  replace?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  isPending?: boolean;
  className?: string;
  children: ReactNode;
  legacyBehavior?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>
  style?: StyleHTMLAttributes<HTMLAnchorElement>
};

const NextLink = forwardRef<HTMLAnchorElement, NextLinkType>(
  (
    {
      href,
      style,
      asPath,
      shallow,
      onClick,
      replace,
      passHref,
      children,
      isPending,
      className,
      legacyBehavior,
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        as={asPath}
        href={href}
        style={style}
        shallow={shallow}
        replace={replace}
        onClick={onClick}
        passHref={passHref}
        className={lib.cn(["cursor-pointer", className])}
      >
        {isPending ? <LoaderCircle className="animate-spin size-6" /> : children}
      </Link>
    );
  }
);

NextLink.displayName = "NextLink";

export default NextLink;