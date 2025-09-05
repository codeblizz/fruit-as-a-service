"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import { LucideStar, LucideStarHalf } from "lucide-react";
import CONSTANTS from "@/packages/helpers/src/constants";

function StarRating({ className, rating = 0 }: { className: string; rating: number }) {
  return CONSTANTS.ratingArray.map((r, idx) =>
    r <= rating ? (
      <LucideStar
        key={idx}
        style={{ fill: "text-secondary" }}
        className={lib.cn("inline-flex flex-row", className)}
      />
    ) : (
      <LucideStarHalf
        key={idx}
        style={{ fill: "text-secondary" }}
        className={lib.cn("inline-flex flex-row", className)}
      />
    )
  );
}

export default StarRating;
