"use client";

import React from "react";
import { LucideStar } from "lucide-react";
import lib from "@/packages/helpers/src/libs";
import CONSTANTS from "@/packages/helpers/src/constants";

function StarRating({
  className,
  rating = 0,
}: {
  rating: number;
  className: string;
}) {
  return CONSTANTS.ratingArray.map((r, idx) => (
    <LucideStar
      key={idx}
      size={24}
      strokeWidth={2}
      fill={r <= rating ? "var(--orange)" : "transparent"}
      className={lib.cn("inline-flex flex-row", className)}
      color={r <= rating ? "var(--orange)" : "var(--secondary-text)"}
    />
  ));
}

export default StarRating;
