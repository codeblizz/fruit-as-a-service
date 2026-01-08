"use client";

import React from "react";
import { Fade } from "react-awesome-reveal";
import lib from "@/packages/helpers/src/libs";
import Span from "@/packages/ui/src/atoms/span";
import Card from "@/packages/ui/src/molecules/card";
import Section from "@/packages/ui/src/atoms/section";
import CONSTANT from "@/packages/helpers/src/constants";
import Paragraph from "@/packages/ui/src/atoms/paragraph";

function PartnerHighlights() {
  const partnerHighLightDetails = CONSTANT.partnerHighLightDetails;
  return (
    <Section className="h-auto w-full flex flex-col justify-start gap-y-3 items-center text-center p-4 bg-coconut-shell text-quaternary">
      <Paragraph className="sm:text-2xl md:text-3xl md:w-[80%] font-extrabold">
        {
          "We partner with verified farms to offer you the freshest produce as per your schedule."
        }
      </Paragraph>
      <Fade duration={1000} cascade delay={100} direction="up">
        <Card
          name="partner"
          className="flex w-full h-full gap-x-2 bg-quaternary p-2"
        >
          {partnerHighLightDetails.map((item, index) => (
            <Section
              className={lib.cn([
                partnerHighLightDetails.length - 1 === index
                  ? ""
                  : "border-r border-fig",
                "flex flex-col items-center text-fig pr-3 w-full h-54 overflow-x-hidden overflow-y-auto min-w-auto mx-auto",
              ])}
            >
              <Span
                name="icon"
                className="w-full flex justify-center items-center"
              >
                <item.icon className="size-4 sm:size-6 md:size-8" />
              </Span>
              <Paragraph className="md:text-2xl w-full">{item.title}</Paragraph>
              <Paragraph className="w-full text-xs md:text-sm mt-5">
                {item.desc}
              </Paragraph>
            </Section>
          ))}
        </Card>
      </Fade>
    </Section>
  );
}

export default PartnerHighlights;
