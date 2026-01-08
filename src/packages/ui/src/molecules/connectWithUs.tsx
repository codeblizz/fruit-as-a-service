"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import Section from "@/packages/ui/src/atoms/section";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import {
  XIcon,
  YoutubeIcon,
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/packages/ui/src/atoms/icons/socials";
function ConnectWithUs({ className }: { className: string }) {
  return (
    <Section className={lib.cn(["flex flex-col text-quaternary", className])}>
      <Paragraph className="text-lg md:text-2xl font-bold">
        {"Connect With Us"}
      </Paragraph>
      <Section className="inline-flex items-center gap-x-1">
        <FacebookIcon />
        <Paragraph className="text-xs md:text-sm">{"Facebook"}</Paragraph>
      </Section>
      <Section className="inline-flex items-center gap-x-1">
        <InstagramIcon />
        <Paragraph className="text-xs md:text-sm">{"Instagram"}</Paragraph>
      </Section>
      <Section className="inline-flex items-center gap-x-1">
        <XIcon />
        <Paragraph className="text-xs md:text-sm">{"Twitter"}</Paragraph>
      </Section>
      <Section className="inline-flex items-center gap-x-1">
        <LinkedinIcon className="" />
        <Paragraph className="text-xs md:text-sm">{"LinkedIn"}</Paragraph>
      </Section>
      <Section className="inline-flex items-center gap-x-1">
        <YoutubeIcon />
        <Paragraph className="text-xs md:text-sm">{"YouTube"}</Paragraph>
      </Section>
    </Section>
  );
}

export default ConnectWithUs;
