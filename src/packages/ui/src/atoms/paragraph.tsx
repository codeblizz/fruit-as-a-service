"use client"

import lib from "@/packages/helpers/src/libs";
import type { HTMLAttributes, ReactNode } from "react";

interface IParagraph extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const Paragraph = ({
  onClick,
  children,
  className,
  ...rest
}: IParagraph) => {
  return (
    <p className={lib.cn(["text-base text-foreground", className])} onClick={onClick} {...rest}>
      {children}
    </p>
  );
};

export default Paragraph;
