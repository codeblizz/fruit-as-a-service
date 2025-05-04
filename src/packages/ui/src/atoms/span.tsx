"use client";

import React, { HTMLAttributes } from "react";

interface SpanType extends HTMLAttributes<HTMLSpanElement> {
  name: string;
}

function Span({ children, id, onClick, role, className }: SpanType) {
  return <span id={id} role={role} className={className} onClick={onClick}>{children}</span>;
}

export default Span;
