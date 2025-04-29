"use client";

import React, { PropsWithChildren, Fragment, forwardRef } from "react";
import { TFragment } from "@/packages/types/ui/fragment.type";

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
