"use client";

import React from "react";
import Section from "@/packages/ui/src/atoms/section";
import CONSTANTS from "@/packages/helpers/src/constants";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import StarRating from "./starRating";

type PriceCardDetails = {
  title: string;
  price: number;
  rating: number;
  sellerName: string;
  description: string;
};
function PriceCardDetails({
  title,
  price,
  rating,
  sellerName,
  description,
}: PriceCardDetails) {
  return (
    <Section className="grid grid-cols-3 border p-1 border-primary-black size-full text-[9px] flex-col">
      <Section className="col-span-1">
        <Paragraph className="" text="Title:" />
        <Paragraph className="" text="Price:" />
        <Paragraph className="" text="Rating:" />
        <Paragraph className="" text="Description:" />
        <Paragraph className="" text="Seller Name:" />
      </Section>
      <Section className="col-span-2">
        <Paragraph className="capitalize" text={title} />
        <Paragraph className="" text={CONSTANTS.defaultCurrency + `${price}`} />
        <StarRating rating={rating} />
        <Paragraph className="capitalize" text={description} />
        <Paragraph className="capitalize" text={sellerName} />
      </Section>
    </Section>
  );
}

export default PriceCardDetails;
