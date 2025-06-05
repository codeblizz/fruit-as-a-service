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
    <Section className="grid grid-cols-3 border p-1 border-secondary-text size-full text-[9px] flex-col">
      <Section className="col-span-1">
        <Paragraph className="">{"Title:"}</Paragraph>
        <Paragraph className="">{"Price:"}</Paragraph>
        <Paragraph className="">{"Rating:"}</Paragraph>
        <Paragraph className="">{"Description:"}</Paragraph>
        <Paragraph className="">{"Seller Name:"}</Paragraph>
      </Section>
      <Section className="col-span-2">
        <Paragraph className="capitalize">{title}</Paragraph>
        <Paragraph className="">
          {CONSTANTS.defaultCurrency + `${price}`}
        </Paragraph>
        <StarRating rating={rating} />
        <Paragraph className="capitalize">{description}</Paragraph>
        <Paragraph className="capitalize">{sellerName}</Paragraph>
      </Section>
    </Section>
  );
}

export default PriceCardDetails;
