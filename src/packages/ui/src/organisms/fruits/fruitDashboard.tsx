"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import Card from "@/packages/ui/src/molecules/card";
import Section from "@/packages/ui/src/atoms/section";
import NextImage from "@/packages/ui/src/atoms/image";
import PriceCardDetails from "@/packages/ui/src/molecules/priceCardDetails";

function FruitDashboard({ className }: { className: string }) {
  return (
    <Section
      className={lib.cn([
        "flex flex-col gap-y-4 justify-start p-6 size-full items-center border-2 border-l-1 mt-16 border-plum",
        className,
      ])}
    >
      <Section className="grid grid-cols-3 gap-3 w-full h-full min-h-48">
        {[1, 2, 3].map((c) => (
          <Card
            key={c}
            name=""
            className="flex flex-col justify-start items-start gap-1 p-1 border-2 border-plum size-full col-span-1"
          >
            <NextImage
              width={100}
              height={100}
              className="size-[50%]"
              src={"/images/fruit-platter-003.webp"}
              alt=""
            />
            <PriceCardDetails
              price={450}
              title="fruit 001"
              description="Some random fruits"
              sellerName="Han Deno"
              rating={4}
            />
          </Card>
        ))}
      </Section>
      <Section className="grid grid-cols-3 gap-3 w-full h-full">
        <Section className="col-span-2 flex flex-col gap-3 justify-center items-center">
          <Section className="grid grid-cols-2 gap-3 w-full h-full min-h-48">
            {[1, 2].map((c) => (
              <Card
                key={c}
                name=""
                className="flex flex-col p-1 justify-start items-start gap-1 border-2 border-plum size-auto col-span-1"
              >
                <NextImage
                  width={100}
                  height={100}
                  className="size-[50%]"
                  src={"/images/fruit-platter-004.webp"}
                  alt=""
                />
                <PriceCardDetails
                  price={650}
                  title="fruit 001"
                  description="Some random fruits"
                  sellerName="Han Deno"
                  rating={4}
                />
              </Card>
            ))}
          </Section>
          <Section className="w-full h-full min-h-48">
            <Card
              className="flex flex-col justify-start items-start border-2 border-plum size-full"
              name=""
            >
              {/* <NextImage width={100} height={100} className="size-[50%]" src={"/images/fruit-platter-003.webp"} alt="" />
              <PriceCardDetails title="fruit 001" description="Some random fruits" sellerName="Han Deno" rating={4} /> */}
            </Card>
          </Section>
        </Section>
        <Section className="w-full h-auto">
          <Card
            className="flex flex-col justify-start items-start border-2 border-plum size-full"
            name=""
          >
            {/* <NextImage width={100} height={100} className="size-[50%]" src={"/images/fruit-platter-002.webp"} alt="" />
            <PriceCardDetails title="fruit 001" description="Some random fruits" sellerName="Han Deno" rating={4} /> */}
          </Card>
        </Section>
      </Section>
      <Section className="grid grid-cols-2 gap-3 w-full min-h-48">
        {[1, 2].map((c) => (
          <Card
            key={c}
            className="flex flex-col justify-start items-start border-2 border-plum size-auto col-span-1"
            name=""
          >
            {/* <NextImage width={100} height={100} className="size-[50%]" src={"/images/fruit-platter-005.webp"} alt="" />
            <PriceCardDetails title="fruit 001" description="Some random fruits" sellerName="Han Deno" rating={4} /> */}
          </Card>
        ))}
      </Section>
    </Section>
  );
}

export default FruitDashboard;
