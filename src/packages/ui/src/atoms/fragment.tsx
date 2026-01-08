"use client";

import React, { PropsWithChildren, Fragment, HTMLAttributes, forwardRef } from "react";

export interface TFragment extends HTMLAttributes<HTMLDivElement> {
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
