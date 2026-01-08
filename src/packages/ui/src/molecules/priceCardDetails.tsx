"use client";

import React from "react";
import StarRating from "./starRating";
import lib from "@/packages/helpers/src/libs";
import Form from "@/packages/ui/src/atoms/form";
import Input from "@/packages/ui/src/atoms/input";
import Button from "@/packages/ui/src/atoms/button";
import Section from "@/packages/ui/src/atoms/section";
import Fragment from "@/packages/ui/src/atoms/fragment";
import CONSTANTS from "@/packages/helpers/src/constants";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import { IPriceCardDetails } from "@/packages/types/src/fruits.type";

function PriceCardDetails({
  edit,
  title,
  price,
  rating,
  onSave,
  cardNo,
  control,
  setValue,
  isLoading,
  sellerName,
  description,
  handleSubmit,
  onEditOrCancel,
}: IPriceCardDetails & { control: any; handleSubmit: any; setValue: any }) {
  return (
    <Form className="size-full p-0" onSubmit={handleSubmit(onSave)}>
      <Section className="grid grid-cols-3 border p-1 border-secondary-text size-full text-[9px] flex flex-col">
        <Section className="col-span-1 text-overflow">
          {["Title:", "Price:", "Rating", "Description", "Seller Name"].map(
            (value, idx) => (
              <Paragraph key={idx} className="text-xs md:text-sm truncate">
                {value}
              </Paragraph>
            )
          )}
        </Section>
        <Section className="col-span-2 flex flex-col border-t border-l border-r border-quaternary">
          {[
            title,
            CONSTANTS.defaultCurrency + price,
            rating,
            description,
            sellerName,
          ].map((value, idx) => {
            return (
              <Fragment key={idx}>
                {edit && cardNo ? (
                  idx === 2 ? (
                    <Paragraph className="capitalize text-sm px-1 border-b border-quaternary">
                      <StarRating rating={rating} className="size-3" />
                    </Paragraph>
                  ) : (
                    <Input
                      id={cardNo}
                      name="fruit"
                      control={control}
                      placeholderClassName=""
                      className="capitalize text-sm h-5 focus rounded-none ring-0 px-1 border-b border-quaternary"
                    />
                  )
                ) : (
                  <Paragraph className="capitalize text-sm px-1 border-b border-quaternary">
                    {idx === 2 ? (
                      <StarRating rating={rating} className="size-3" />
                    ) : (
                      value
                    )}
                  </Paragraph>
                )}
              </Fragment>
            );
          })}
        </Section>
      </Section>
      <Section
        className={lib.cn(
          "w-full border-1 border-plum flex justify-center items-center gap-x-16 p-2"
        )}
      >
        {["save", "edit", "cancel"].map((val) => (
          <Button
            name={val}
            type="button"
            isPending={isLoading}
            onClick={onEditOrCancel}
            className={lib.cn(
              (edit && val === "edit") || (!edit && val === "save")
                ? "hidden"
                : "flex h-6 w-16 text-xs md:text-sm capitalize"
            )}
          >
            {val}
          </Button>
        ))}
      </Section>
    </Form>
  );
}

export default PriceCardDetails;
