"use client";

import React, { PropsWithChildren, Fragment, forwardRef } from "react";

import { HtmlHTMLAttributes } from "react";

export interface TFragment extends HtmlHTMLAttributes<HTMLDivElement> {
  name?: string;
  custom?: boolean;
}

const Fragments = forwardRef<HTMLDivElement, PropsWithChildren<TFragment>>(
  ({ children, className, custom = true, ...rest }, ref) => {
    return custom ? (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    ) : (
      <Fragment>{children}</Fragment>
    );
  }
);

Fragments.displayName = "Fragments";

export default Fragments;
