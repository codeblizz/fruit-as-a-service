"use client";

import { TBaseElement } from "@/packages/types/src/ui/base.type";
import React from "react";

interface SpanType extends TBaseElement {
  onClick?: () => void;
}

function Span({ children, onClick, className }: SpanType) {
  return <span className={className} onClick={onClick}>{children}</span>;
}

export default Span;
