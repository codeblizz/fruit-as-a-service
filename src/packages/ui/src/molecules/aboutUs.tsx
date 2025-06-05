"use client";

import React from "react";
import Section from "../atoms/section";
import Paragraph from "../atoms/paragraph";
import lib from "@/packages/helpers/src/libs";

function AboutUs({ className }: { className: string }) {
  return (
    <Section className={lib.cn(["flex flex-col text-quaternary", className])}>
      <Paragraph className="text-lg md:text-2xl font-bold">
        {"About Us"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Our Story"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Our Mission"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Our Team"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Testimonials"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"The Press Room"}
      </Paragraph>
      <Paragraph className="inline-flex items-center text-xs md:text-sm">
        {"Careers"}
      </Paragraph>
    </Section>
  );
}

export default AboutUs;
