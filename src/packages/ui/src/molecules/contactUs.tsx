"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import Section from "@/packages/ui/src/atoms/section";
import CONSTANT from "@/packages/helpers/src/constants";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
function ContactUs({ className }: { className: string }) {
  return (
    <Section className={lib.cn(["flex flex-col text-quaternary", className])}>
      <Paragraph className="text-lg md:text-2xl font-bold">
        {"Contact Us"}
      </Paragraph>
      <Paragraph className="text-xs md:text-sm">{`Address: ${CONSTANT.Address}`}</Paragraph>
      <Paragraph className="text-xs md:text-sm">
        {`Phone: ${CONSTANT.Phone}`}{" "}
      </Paragraph>
      <Paragraph className="text-xs md:text-sm">{`Email: ${CONSTANT.Email}`}</Paragraph>
    </Section>
  );
}

export default ContactUs;
