"use client";

import React from "react";
import Section from "@/packages/ui/src/atoms/section";
import Paragraph from "../atoms/paragraph";
import CONSTANT from "@/packages/helpers/src/constants";
function ContactUs() {
  return <Section className="flex flex-col text-white">
    <Paragraph text="Contact Us" className="text-2xl font-bold" />
    <Paragraph text={`Address: ${CONSTANT.Address}`} className="text-sm" />
    <Paragraph text={`Phone: ${CONSTANT.Phone}`} className="text-sm" />
    <Paragraph text={`Email: ${CONSTANT.Email}`} className="text-sm" />
  </Section>;
}

export default ContactUs;
