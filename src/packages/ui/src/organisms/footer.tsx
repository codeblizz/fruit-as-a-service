"use client";

import React from "react";
import CONSTANT from "@/packages/helpers/src/constants";
import Section from "@/packages/ui/src/atoms/section";
import AboutUs from "@/packages/ui/src/molecules/aboutUs";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import ContactUs from "@/packages/ui/src/molecules/contactUs";
import NeedAnswers from "@/packages/ui/src/molecules/needAnswers";
import ConnectWithUs from "@/packages/ui/src/molecules/connectWithUs";

function Footer() {
  const label = CONSTANT.footerLabels;
  return (
    <>
      <Section className="bg-fig w-full h-72 p-16 flex justify-between">
        <AboutUs />
        <NeedAnswers />
        <ContactUs />
        <ConnectWithUs />
      </Section>
      <Section className="inline-flex items-center justify-center w-full font-bold gap-x-1 bg-guava text-strawberry">
        {label.map((text, index) => (
          <>
          <Paragraph key={index} className="" text={text} />
          {label.length - 1 !== index ? <span className="size-1 bg-black rounded-full"></span> : null}
          </>
        ))}
      </Section>
    </>
  );
}

export default Footer;
