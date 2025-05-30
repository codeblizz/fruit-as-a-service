"use client";

import React from "react";
import Section from "../atoms/section";
import Paragraph from "../atoms/paragraph";

function NeedAnswers() {
  return <Section className="flex flex-col text-white">
  <Paragraph className="text-2xl font-bold" text="Need Answers?" />
  <Paragraph className="inline-flex items-center text-sm" text="Frequently Asked Questions" />
  <Paragraph className="inline-flex items-center text-sm" text="School Fruit Delivery" />
  <Paragraph className="inline-flex items-center text-sm" text="Infographics" />
  <Paragraph className="inline-flex items-center text-sm" text="Privacy Policy" />
  <Paragraph className="inline-flex items-center text-sm" text="Billing & Terms of Service" />
  <Paragraph className="inline-flex items-center text-sm" text="Cancellation Policy" />
  <Paragraph className="inline-flex items-center text-sm" text="Do Not Sell or Share My Personal Information" />
</Section>;
}

export default NeedAnswers;
