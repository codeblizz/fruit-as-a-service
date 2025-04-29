"use client"

import lib from "@/packages/helpers/src/libs";
import type { HTMLAttributes } from "react";

interface Paragraph extends HTMLAttributes<HTMLParagraphElement> {
  text: string;
  className: string;
  onClick?: () => void;
};

const Paragraph = ({
  text,
  onClick,
  className,
  ...rest
}: Paragraph) => {
  return (
    <p className={lib.cn([className])} onClick={onClick} {...rest}>
      {text}
    </p>
  );
};

export default Paragraph;
