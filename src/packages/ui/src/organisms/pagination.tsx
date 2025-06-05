"use client";

import React, { useRef, useState } from "react";
import lib from "@/packages/helpers/src/libs";
import Fragment from "@/packages/ui/src/atoms/fragment";
function Pagination({
  className,
  pageNumber,
  handleNext,
  currentIndex,
  handlePrevious,
}: {
  className?: string;
  pageNumber: number;
  currentIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
}) {

  return (
    <Fragment className="flex flex-row gap-x-2 p-2">
      {Array.from({ length: pageNumber }).map((_, index) => {
        return (
          <Fragment
            key={index}
            className={lib.cn(
              currentIndex === index ? "bg-passion-fruit" : "bg-quaternary",
              "size-2 rounded-full outline-1 outline-apple-green cursor-pointer",
              className
            )}
            onClick={() => {
              if (currentIndex === 0 || currentIndex + 1 === index) handleNext();
              else if (currentIndex - 1 === index) handlePrevious();
              else return currentIndex = 0;
            }}
          ></Fragment>
        );
      })}
    </Fragment>
  );
}

export default Pagination;
