"use client";

import type { MouseEventHandler, LabelHTMLAttributes } from "react";

export interface TLabel extends LabelHTMLAttributes<HTMLLabelElement> {
  className: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLLabelElement>
}

function Label({ className, htmlFor, children, onClick }: TLabel) {
  return <label htmlFor={htmlFor} onClick={onClick} className={className}>{children}</label>;
}

export default Label;
