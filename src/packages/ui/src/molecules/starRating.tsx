"use client";

import React from "react";
import { StarHalfIcon, StarIcon } from "lucide-react";
import CONSTANTS from "@/packages/helpers/src/constants";

function StarRating({ rating = 0 }: { rating: number }) {
  return CONSTANTS.ratingArray.map((r, idx) =>
    r <= rating ? (
      <StarHalfIcon
        key={idx}
        className="inline-flex flex-row size-2"
        style={{ fill: "text-secondary" }}
      />
    ) : (
      <StarIcon
        key={idx}
        className="inline-flex flex-row size-2"
        style={{ fill: "text-secondary" }}
      />
    )
  );
}

export default StarRating;
