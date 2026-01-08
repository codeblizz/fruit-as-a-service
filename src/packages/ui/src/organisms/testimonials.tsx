"use client";
import React, { useState } from "react";
import { QuoteIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import lib from "@/packages/helpers/src/libs";
import Section from "@/packages/ui/src/atoms/section";
import Fragment from "@/packages/ui/src/atoms/fragment";
import CONSTANT from "@/packages/helpers/src/constants";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import Pagination from "@/packages/ui/src/organisms/pagination";
import { Card } from "@/packages/ui/src/molecules/card";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => prev + 1);

  const handlePrevious = () => setCurrentIndex((prev) => prev - 1);

  return (
    <Fragment className="w-full h-full bg-strawberry p-5 flex flex-col gap-y-3 justify-evenly items-center">
      <Paragraph className="text-quaternary md:text-3xl text-center font-normal">
        Testimonials
      </Paragraph>
      <Fade
        cascade
        delay={100}
        duration={1000}
        direction="right"
        className="flex flex-col size-full justify-center items-center"
      >
        <Section className="flex flex-row w-[80%] md:w-[60%] min-h-full justify-between items-center gap-x-5">
          <ArrowLeftCircle
            onClick={handlePrevious}
            className={lib.cn(
              "size-10 stroke-1 stroke-fig",
              currentIndex === 0 ? "invisible" : "visible cursor-pointer"
            )}
          />
          <Section className="flex flex-row w-full h-48 rounded-t-xl overflow-auto justify-between items-center gap-x-3 snap-x snap-mandatory scroll-smooth">
            {CONSTANT.testimonials.map(
              (testimonial, index) =>
                index === currentIndex && (
                  <Card
                    key={index}
                    className="relative bg-quaternary w-full min-h-full snap-center snap-always snap-x gap-y-2 p-4 border-none flex flex-col justify-center items-start"
                  >
                    <QuoteIcon className="absolute stroke-1 stroke-quaternary fill-passion-fruit top-5 md:top-3 right-3 float-right size-4 sm:size-5 md:size-6" />
                    <Paragraph className="text-left text-sm font-light text-apple-green">
                      {testimonial.text}
                    </Paragraph>
                    <Paragraph className="text-left text-sm font-light text-apple-green">
                      {testimonial.name}
                    </Paragraph>
                  </Card>
                )
            )}
          </Section>
          <ArrowRightCircle
            onClick={handleNext}
            className={lib.cn(
              "size-10 stroke-1 stroke-fig",
              currentIndex === CONSTANT.testimonials.length - 1
                ? "invisible"
                : "visible cursor-pointer"
            )}
          />
        </Section>
      </Fade>
      <Fade cascade delay={100} duration={1000} direction="left">
        <Pagination
          className=""
          handleNext={handleNext}
          currentIndex={currentIndex}
          handlePrevious={handlePrevious}
          pageNumber={CONSTANT.testimonials.length}
        />
      </Fade>
    </Fragment>
  );
}

export default Testimonials;
