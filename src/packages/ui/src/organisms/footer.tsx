"use client";

import React from "react";
import Span from "@/packages/ui/src/atoms/span";
import Section from "@/packages/ui/src/atoms/section";
import CONSTANT from "@/packages/helpers/src/constants";
import Fragment from "@/packages/ui/src/atoms/fragment";
import AboutUs from "@/packages/ui/src/molecules/aboutUs";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import ContactUs from "@/packages/ui/src/molecules/contactUs";
import NeedAnswers from "@/packages/ui/src/molecules/needAnswers";
import ConnectWithUs from "@/packages/ui/src/molecules/connectWithUs";

function Footer() {
  const footerLabels = CONSTANT.footerLabels;
  
  return (
    <Fragment className="h-full w-full flex flex-col gap-y-3">
      <Section className="bg-fig w-full max-h-72 p-4 sm:p-6 md:p-12 grid grid-cols-2 gap-y-4 md:flex md:flex-row md:justify-center md:items-start">
        <AboutUs className="inline-flex justify-start p-0 items-start w-54 md:40 mx-auto" />
        <NeedAnswers className="inline-flex justify-start -ml-5 md:pr-2 items-start w-54 mx-auto" />
        <ContactUs className="inline-flex justify-start md:px-2 items-start w-54 mx-auto" />
        <ConnectWithUs className="inline-flex justify-start md:px-2 items-start w-54 mx-auto" />
      </Section>
      <Section className="inline-flex items-center mt-3 justify-center w-full font-bold gap-x-1 bg-guava text-strawberry">
        {footerLabels.map((text, index) => (
          <>
            <Paragraph key={index} className="text-sm md:text-[1rem]">{text}</Paragraph>
            {footerLabels.length - 1 !== index ? (
              <Span name="" className="size-1 bg-black rounded-full"></Span>
            ) : null}
          </>
        ))}
      </Section>
    </Fragment>
  );
}

export default Footer;
