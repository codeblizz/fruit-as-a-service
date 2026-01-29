"use client";

import React from "react";
import StarRating from "./starRating";
import { ImageIcon } from "lucide-react";
import lib from "@/packages/helpers/src/libs";
import Form from "@/packages/ui/src/atoms/form";
import Input from "@/packages/ui/src/atoms/input";
import Section from "@/packages/ui/src/atoms/section";
import { Card, CardContent, CardFooter } from "./card";
import { Button } from "@/packages/ui/src/atoms/button";
import CONSTANTS from "@/packages/helpers/src/constants";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import FruitImageView from "../organisms/fruits/fruitImageView";
import {
  IPriceCardDetails,
  ImagePreviewDetails,
} from "@/packages/types/src/fruits.type";

function PriceCardDetails({
  edit,
  title,
  price,
  rating,
  onSave,
  cardNo,
  images,
  control,
  getValues,
  isLoading,
  sellerName,
  description,
  handleSubmit,
  onDeleteImage,
  onEditOrCancel,
}: IPriceCardDetails & {
  control: any;
  setValue: any;
  getValues: any;
  handleSubmit: any;
  onDeleteImage: (imageSrc: string) => void;
}) {
  const isEditCard = edit && cardNo === getValues("cardNo");

  return (
    <Section className="flex flex-col md:flex-row gap-8 items-between size-full">
      <Card
        size="sm"
        hover="lift"
        variant="fruit"
        interactive={true}
        className="flex flex-1 flex-col w-full cursor-default justify-start items-start gap-1 p-1 border-2 border-emerald-600"
      >
        <CardContent className="p-0 w-full !text-primary/70 flex-grow flex flex-col">
          <Form
            onSubmit={handleSubmit(onSave)}
            className="p-0 flex-grow flex flex-col text-foreground"
          >
            <Section className="border p-2 border-secondary-text flex flex-col justify-around flex-grow">
              <Section className="grid grid-cols-3 gap-2 items-center border-b pb-1">
                <Paragraph className="text-sm border-r font-semibold text-left pr-2">
                  Title:
                </Paragraph>
                <Section className="col-span-2">
                  {isEditCard ? (
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
              <Section className="grid grid-cols-3 gap-2 items-center border-b pb-1">
                <Paragraph className="text-sm font-semibold border-r text-left pr-2">
                  Price:
                </Paragraph>
                <Section className="col-span-2">
                  {isEditCard ? (
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
              <Section className="grid grid-cols-3 gap-2 items-center border-b pb-1">
                <Paragraph className="text-sm font-semibold border-r text-left pr-2">
                  Rating:
                </Paragraph>
                <Section className="col-span-2">
                  <Section className="px-2 py-1 rounded flex items-center min-h-[1.5rem]">
                    <StarRating rating={rating} className="size-3" />
                    <Paragraph className="ml-2 text-sm text-gray-600">
                      ({rating ?? 0}/5)
                    </Paragraph>
                  </Section>
                </Section>
              </Section>
              <Section className="grid grid-cols-3 gap-2 items-start border-b pb-1">
                <Paragraph className="text-sm font-semibold border-r text-left pr-2 pt-1">
                  Description:
                </Paragraph>
                <Section className="col-span-2 flex-grow">
                  {isEditCard ? (
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
              <Section className="grid grid-cols-3 border-r gap-2 items-center">
                <Paragraph className="text-sm font-semibold text-left pr-2">
                  Seller Name:
                </Paragraph>
                <Section className="col-span-2">
                  {isEditCard ? (
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
            {["save", "edit", "cancel"].map((val, index) => (
              <Button
                key={index}
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
                    images: images,
                    sellerName: sellerName,
                    description: description,
                  })
                }
                className={lib.cn(
                  (isEditCard && val === "edit") ||
                    (!isEditCard && val === "save")
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
      <Card className="xl:w-[450px] flex-1 grid grid-cols-2 gap-4 bg-ghost-apple p-6 border-2 border-emerald-600/20">
        {images?.length > 0 ? (
          images.map((image: ImagePreviewDetails) => (
            <FruitImageView
              key={image.id}
              title={title}
              imageSrc={image.imageUrl}
              onDeleteImage={onDeleteImage}
              isEditCard={isEditCard}
            />
          ))
        ) : (
          <div className="col-span-2 rounded-[2rem] bg-stone-100 border-2 border-dashed border-stone-300 flex flex-col items-center justify-center p-12 text-stone-400">
            <ImageIcon size={48} strokeWidth={1} />
            <span className="text-sm mt-4 font-bold uppercase tracking-widest">
              No Visual Assets
            </span>
          </div>
        )}
      </Card>
    </Section>
  );
}

export default PriceCardDetails;
