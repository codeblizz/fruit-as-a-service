"use client";

import React from "react";
import Section from "../atoms/section";
import Paragraph from "../atoms/paragraph";
import lib from "@/packages/helpers/src/libs";

function NeedAnswers({ className }: { className: string }) {
  return (
    <Section className={lib.cn(["flex flex-col text-quaternary", className])}>
      <Paragraph className="text-lg md:text-2xl font-bold">
        {"Need Answers?"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Frequently Asked Questions"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"School Fruit Delivery"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Infographics"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Privacy Policy"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Billing & Terms of Service"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Cancellation Policy"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Do Not Sell or Share My Personal Information"}
      </Paragraph>
    </Section>
  );
}

export default NeedAnswers;
