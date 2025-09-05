"use client";

import lib from "@/packages/helpers/src/libs";
import Card from "@/packages/ui/src/molecules/card";
import Section from "@/packages/ui/src/atoms/section";
import NextImage from "@/packages/ui/src/atoms/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { MouseEventHandler, useState } from "react";
import { TPriceCardDetails } from "@/packages/types/src/fruits.type";
import PriceCardDetails from "@/packages/ui/src/molecules/priceCardDetails";
import { PriceCardDetailSchema } from "@/packages/helpers/src/validations/fruits.validate";
import CONSTANT from "@/packages/helpers/src/constants";

function FruitDashboard({ className }: { className: string }) {
  const [edit, setEdit] = useState(false);
  const {
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty, errors, isLoading, isSubmitting, isSubmitSuccessful },
  } = useForm<TPriceCardDetails>({
    defaultValues: {
      price: 0,
      rating: 0,
      title: "",
      sellerName: "",
      description: "",
    },
    resolver: zodResolver(PriceCardDetailSchema),
  });

  const onSave: SubmitHandler<TPriceCardDetails> = (data) => {
    console.log("data", data);
    setEdit(false);
  };

  const onEditOrCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(e.currentTarget.name === "edit") setEdit(true);
    if(e.currentTarget.name === "cancel") setEdit(false);
    // setValue()
  };

  return (
    <Section
      className={lib.cn([
        "flex flex-col gap-3 justify-start p-6 items-center border-2 border-l-1 my-16 border-plum",
        className,
      ])}
    >
      <Section className="grid grid-cols-3 gap-3 size-fit">
        {[1, 2, 3].map((c) => (
          <Card
            key={c}
            name=""
            className="flex flex-col size-fit justify-start items-start gap-1 p-1 border-2 border-plum col-span-1"
          >
            <NextImage
              alt=""
              width={300}
              height={100}
              src={"/images/fruit-platter-003.webp"}
              className="h-54 min-w-full object-cover"
            />
            {CONSTANT.priceCardDetails.map(() => <PriceCardDetails
              rating={4}
              cardNo="1"
              price={450}
              edit={edit}
              onSave={onSave}
              control={control}
              title="fruit 001"
              setValue={setValue}
              sellerName="Han Deno"
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              onEditOrCancel={onEditOrCancel}
              description="Some random fruits"
            />)}
          </Card>
        ))}
      </Section>
      <Section className="grid grid-cols-3 gap-3">
        <Section className="col-span-2 flex flex-col gap-y-3 justify-center items-center">
          <Section className="grid grid-cols-2 gap-x-3 min-h-48">
            {[1, 2].map((val) => (
              <Card
                key={val}
                name=""
                className="flex flex-col p-1 size-fit justify-start items-start gap-1 border-2 border-plum col-span-1"
              >
                <NextImage
                  alt=""
                  width={300}
                  height={100}
                  src={"/images/fruit-platter-004.webp"}
                  className="h-54 min-w-full object-cover"
                />
                <PriceCardDetails
                  rating={4}
                  cardNo="1"
                  price={450}
                  edit={edit}
                  onSave={onSave}
                  control={control}
                  title="fruit 001"
                  setValue={setValue}
                  isLoading={isLoading}
                  sellerName="Han Deno"
                  handleSubmit={handleSubmit}
                  onEditOrCancel={onEditOrCancel}
                  description="Some random fruits"
                />
              </Card>
            ))}
          </Section>
          <Section className="w-full max-h-[50%]">
            <Card
              name=""
              className="flex flex-col p-1 w-full h-fit justify-start items-start gap-1 border-2 border-plum col-span-1"
            >
              <NextImage
                alt=""
                width={300}
                height={100}
                src={"/images/fruit-platter-003.webp"}
                className="h-54 min-w-full object-cover"
              />
              <PriceCardDetails
                rating={4}
                cardNo="1"
                price={450}
                edit={edit}
                onSave={onSave}
                title="fruit 001"
                control={control}
                setValue={setValue}
                isLoading={isLoading}
                sellerName="Han Deno"
                handleSubmit={handleSubmit}
                onEditOrCancel={onEditOrCancel}
                description="Some random fruits"
              />
            </Card>
          </Section>
        </Section>
        <Section className="flex flex-col col-span-1 gap-y-3 w-full h-fit">
          {[1, 2].map((val) => (
            <Card
              key={val}
              name=""
              className="flex flex-col p-1 size-fit justify-start items-start gap-1 border-2 border-plum col-span-1"
            >
              <NextImage
                alt=""
                width={300}
                height={100}
                src={"/images/fruit-platter-002.webp"}
                className="h-54 min-w-full object-cover"
              />
              <PriceCardDetails
                rating={4}
                cardNo="1"
                price={450}
                edit={edit}
                onSave={onSave}
                title="fruit 001"
                control={control}
                setValue={setValue}
                sellerName="Han Deno"
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                onEditOrCancel={onEditOrCancel}
                description="Some random fruits"
              />
            </Card>
          ))}
        </Section>
      </Section>
      <Section className="grid grid-cols-3 size-fit gap-3">
        {[1, 2, 3].map((val) => (
          <Card
            key={val}
            name=""
            className="flex flex-col p-1 size-fit justify-start items-start gap-1 border-2 border-plum col-span-1"
          >
            <NextImage
              alt=""
              width={300}
              height={100}
              src={"/images/fruit-platter-005.webp"}
              className="h-54 min-w-full object-cover"
            />
            <PriceCardDetails
              rating={4}
              cardNo="1"
              price={450}
              edit={edit}
              onSave={onSave}
              title="fruit 001"
              control={control}
              setValue={setValue}
              sellerName="Han Deno"
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              onEditOrCancel={onEditOrCancel}
              description="Some random fruits"
            />
          </Card>
        ))}
      </Section>
    </Section>
  );
}

export default FruitDashboard;
