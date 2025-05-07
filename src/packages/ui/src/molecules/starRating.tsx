import React from "react";
import CONSTANTS from "@/packages/helpers/src/constants";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

function StarRating({ rating = 0 }: { rating: number }) {
  return CONSTANTS.ratingArray.map((r, idx) =>
    r <= rating ? (
      <StarFilledIcon
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
