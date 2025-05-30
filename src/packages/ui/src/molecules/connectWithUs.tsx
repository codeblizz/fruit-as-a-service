"use client";

import React from "react";
import Section from "../atoms/section";
import Paragraph from "../atoms/paragraph";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
function ConnectWithUs() {
  return <Section className="flex flex-col text-white">
    <Paragraph text="Connect With Us" className="text-2xl font-bold" />
    <Section className="inline-flex items-center"><Facebook /><Paragraph text="Facebook" className="text-sm" /></Section>
    <Section className="inline-flex items-center"><Instagram /><Paragraph text="Instagram" className="text-sm" /></Section>
    <Section className="inline-flex items-center"><Twitter /><Paragraph text="Twitter" className="text-sm" /></Section>
    <Section className="inline-flex items-center"><Linkedin /><Paragraph text="LinkedIn" className="text-sm" /></Section>
    <Section className="inline-flex items-center"><Youtube /><Paragraph text="YouTube" className="text-sm" /></Section>
  </Section>;
}

export default ConnectWithUs;
