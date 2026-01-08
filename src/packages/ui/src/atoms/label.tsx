"use client";

import type { LabelHTMLAttributes } from "react";

export interface TLabel extends LabelHTMLAttributes<HTMLLabelElement> {
  ariaLabel?: string;
  children: React.ReactNode;
}

function Label({ className, id, ariaLabel, htmlFor, children, onClick }: TLabel) {
  return (
    <label
      id={id}
      htmlFor={htmlFor}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </label>
  );
}

export default Label;
