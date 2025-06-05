"use client";

import React, { HTMLAttributes } from 'react'

export interface TSection extends HTMLAttributes<HTMLDivElement> {}

function Section({ className, children }: TSection) {
  return (
    <section className={className}>
      {children}
    </section>
  )
}

export default Section;
