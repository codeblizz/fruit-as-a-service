"use client";

import React, { memo } from "react";
import lib from "@/packages/helpers/src/libs";
import Section from "@/packages/ui/src/atoms/section";
import Fragment from "@/packages/ui/src/atoms/fragment";

function Skeleton({
  rows,
  columns,
  className,
  showCircle,
}: {
  rows: number;
  columns: number;
  className: string;
  showCircle: boolean;
}) {
  return (
    <Section
      className={lib.cn([
        "border-b border-gray-200 shadow bg-quaternary-alpha rounded-b-md p-4 h-full",
        className,
      ])}
    >
      <Fragment className="animate-pulse flex space-x-4 h-full">
        {showCircle ? (
          <div className="rounded-full bg-gray-200 h-35 w-35"></div>
        ) : null}
        <Section className="flex-1 space-y-6 py-1 h-full justify-between">
          <Fragment className="h-2 bg-gray-200 rounded"/>
          <Section className="space-y-3">
            {Array.from({ length: rows }, (_, index) => index).map(() => (
              <Section className={`grid grid-cols-${columns} gap-4`}>
                {Array.from({ length: columns }, (_, index) => index).map(
                  (_, index) => (
                    <Fragment
                      key={index}
                      className="h-2 bg-gray-200 w-full rounded col-span-1"
                    />
                  )
                )}
              </Section>
            ))}
          </Section>
          <Fragment className="h-2 bg-gray-200 rounded"/>
        </Section>
      </Fragment>
    </Section>
  );
}

export default memo(Skeleton);
