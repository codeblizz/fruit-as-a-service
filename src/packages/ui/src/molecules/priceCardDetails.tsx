"use client";

import React from "react";
import StarRating from "./starRating";
import NextImage from "../atoms/image";
import lib from "@/packages/helpers/src/libs";
import Form from "@/packages/ui/src/atoms/form";
import Input from "@/packages/ui/src/atoms/input";
import Section from "@/packages/ui/src/atoms/section";
import CONSTANTS from "@/packages/helpers/src/constants";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import { Button } from "@/packages/ui/src/atoms/button";
import { IPriceCardDetails } from "@/packages/types/src/fruits.type";
import { Card, CardContent, CardHeader, CardFooter } from "./card";

function PriceCardDetails({
  edit,
  title,
  price,
  rating,
  onSave,
  cardNo,
  control,
  imageSrc,
  getValues,
  isLoading,
  sellerName,
  description,
  handleSubmit,
  onEditOrCancel,
}: IPriceCardDetails & {
  control: any;
  setValue: any;
  getValues: any;
  handleSubmit: any;
}) {
  const isCurrentlyEditing = edit && cardNo === getValues("cardNo");

  return (
    <Card
      variant="fruit"
      size="sm"
      hover="lift"
      interactive={true}
      className="flex flex-col w-full h-full justify-start items-start gap-1 p-1 border-2 border-emerald-600 col-span-1"
    >
      <CardHeader className="p-0 w-full flex-shrink-0">
        <NextImage
          alt={title || "Fruit image"}
          width={300}
          height={200}
          src={imageSrc}
          className="h-48 w-full object-cover rounded-t"
        />
      </CardHeader>

      <CardContent className="p-0 w-full flex-grow flex flex-col">
        <Form
          onSubmit={handleSubmit(onSave)}
          className="p-0 flex-grow flex flex-col text-foreground bg-ghost-apple"
        >
          <Section className="border p-2 border-secondary-text flex-grow">
            {/* Title Row */}
            <Section className="grid grid-cols-3 gap-2 items-center mb-2">
              <Paragraph className="text-xs font-medium text-left pr-2">
                Title:
              </Paragraph>
              <Section className="col-span-2">
                {isCurrentlyEditing ? (
                  <Input
                    id={`${cardNo}-title`}
                    name="title"
                    control={control}
                    defaultValue={title}
                    labelClassName=""
                    className="w-full capitalize text-sm h-8 focus rounded-none ring-0 px-2 border border-quaternary"
                  />
                ) : (
                  <Paragraph className="capitalize text-sm px-2 py-1 rounded min-h-[1.5rem] flex items-center">
                    {title}
                  </Paragraph>
                )}
              </Section>
            </Section>

            {/* Price Row */}
            <Section className="grid grid-cols-3 gap-2 items-center mb-2">
              <Paragraph className="text-xs font-medium text-left pr-2">
                Price:
              </Paragraph>
              <Section className="col-span-2">
                {isCurrentlyEditing ? (
                  <Input
                    name="price"
                    control={control}
                    defaultValue={price}
                    id={`${cardNo}-price`}
                    labelClassName=""
                    className="w-full capitalize text-sm h-8 focus rounded-none ring-0 px-2 border border-quaternary"
                  />
                ) : (
                  <Paragraph className="capitalize text-sm px-2 py-1 rounded font-semibold text-green-600 min-h-[1.5rem] flex items-center">
                    {CONSTANTS.defaultCurrency}
                    {price}
                  </Paragraph>
                )}
              </Section>
            </Section>

            {/* Rating Row */}
            <Section className="grid grid-cols-3 gap-2 items-center mb-2">
              <Paragraph className="text-xs font-medium text-left pr-2">
                Rating:
              </Paragraph>
              <Section className="col-span-2">
                <Section className="px-2 py-1 rounded flex items-center min-h-[1.5rem]">
                  <StarRating rating={rating} className="size-3" />
                  <Paragraph className="ml-2 text-xs text-gray-600">
                    ({rating}/5)
                  </Paragraph>
                </Section>
              </Section>
            </Section>

            {/* Description Row */}
            <Section className="grid grid-cols-3 gap-2 items-start mb-2 flex-grow">
              <Paragraph className="text-xs font-medium text-left pr-2 pt-1">
                Description:
              </Paragraph>
              <Section className="col-span-2 flex-grow">
                {isCurrentlyEditing ? (
                  <textarea
                    rows={10}
                    name="description"
                    defaultValue={description}
                    placeholder="Enter description..."
                    className="w-full h-full min-h-[4rem] max-h-[6rem] text-sm lowercase resize-none overflow-x-auto overflow-y-auto px-2 py-1 border border-quaternary rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <Paragraph className="text-sm px-2 py-1 rounded min-h-[4rem] max-h-[6rem] overflow-y-auto whitespace-pre-wrap flex-grow">
                    {description || "No description provided"}
                  </Paragraph>
                )}
              </Section>
            </Section>

            {/* Seller Name Row */}
            <Section className="grid grid-cols-3 gap-2 items-center">
              <Paragraph className="text-xs font-medium text-left pr-2">
                Seller Name:
              </Paragraph>
              <Section className="col-span-2">
                {isCurrentlyEditing ? (
                  <Input
                    id={`${cardNo}-sellerName`}
                    name="sellerName"
                    control={control}
                    defaultValue={sellerName}
                    labelClassName=""
                    className="w-full capitalize text-sm h-8 focus rounded-none ring-0 px-2 border border-quaternary"
                  />
                ) : (
                  <Paragraph className="capitalize text-sm px-2 py-1 rounded min-h-[1.5rem] flex items-center">
                    {sellerName}
                  </Paragraph>
                )}
              </Section>
            </Section>
          </Section>
        </Form>
      </CardContent>

      <CardFooter className="p-0 w-full">
        <Section
          className={lib.cn(
            "w-full border-1 border-plum flex justify-between items-center gap-x-8 p-2"
          )}
        >
          {["save", "edit", "cancel"].map((val) => (
            <Button
              key={val}
              name={val}
              type="button"
              variant="primary"
              loading={isLoading}
              onClick={(e) =>
                onEditOrCancel(e, {
                  title: title,
                  price: price,
                  rating: rating,
                  cardNo: cardNo,
                  imageSrc: imageSrc,
                  sellerName: sellerName,
                  description: description,
                })
              }
              className={lib.cn(
                (isCurrentlyEditing && val === "edit") ||
                  (!isCurrentlyEditing && val === "save")
                  ? "hidden"
                  : "flex h-8 w-20 min-w-max text-xs md:text-sm capitalize"
              )}
            >
              {val}
            </Button>
          ))}
        </Section>
      </CardFooter>
    </Card>
  );
}

export default PriceCardDetails;
