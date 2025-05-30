"use client";

import React from "react";
import Section from "../atoms/section";
import Paragraph from "../atoms/paragraph";

function AboutUs() {
  return <Section className="flex flex-col text-white">
    <Paragraph className="text-2xl font-bold" text="About Us" />
    <Paragraph className="inline-flex items-center text-sm" text="Our Story" />
    <Paragraph className="inline-flex items-center text-sm" text="Our Mission" />
    <Paragraph className="inline-flex items-center text-sm" text="Our Team" />
    <Paragraph className="inline-flex items-center text-sm" text="Testimonials" />
    <Paragraph className="inline-flex items-center text-sm" text="The Press Room" />
    <Paragraph className="inline-flex items-center text-sm" text="Careers" />
  </Section>;
}

export default AboutUs;
