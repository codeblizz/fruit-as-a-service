"use client";

import React, { useEffect, useRef, useState } from "react";

import { Fade } from "react-awesome-reveal";
import lib from "@/packages/helpers/src/libs";
import NextImage from "@/packages/ui/src/atoms/image";
import Section from "@/packages/ui/src/atoms/section";
import Paragraph from "@/packages/ui/src//atoms/paragraph";
import Pagination from "@/packages/ui/src/organisms/pagination";
import { ArrowRightCircle, ArrowLeftCircle } from "lucide-react";

function Carousel({
  className,
  imageDesc,
  imageUrls,
  imageClass,
}: {
  className: string;
  imageClass: string;
  imageDesc: string[];
  imageUrls: string[];
}) {
  const [index, setIndex] = useState(0);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

  const resetInterval = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
  };

  const handlePrevious = () =>
    setIndex((prevIndex) => (prevIndex - 1) % imageUrls.length);
  const handleNext = () =>
    setIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);

  useEffect(() => {
    timeoutRef.current = setInterval(() => handleNext, 5000);
    return resetInterval;
  }, []);

  return (
    <Section className={lib.cn(["relative", className])}>
      <ArrowLeftCircle
        onClick={handlePrevious}
        className={lib.cn(
          "size-10 stroke-1 stroke-quaternary absolute left-[11%] top-[45%]",
          index === 0 ? "invisible" : "visible cursor-pointer"
        )}
      />
      <NextImage
        alt="hero"
        width={700}
        height={395}
        priority={true}
        src={imageUrls[index]}
        style={{ objectFit: "cover" }}
        className={lib.cn(["size-full object-cover min-w-full", imageClass])}
      />
      <ArrowRightCircle
        onClick={handleNext}
        className={lib.cn(
          "size-10 stroke-1 stroke-quaternary absolute right-[11%] top-[45%]",
          index === imageUrls.length - 1
            ? "invisible"
            : "visible cursor-pointer"
        )}
      />
      <Fade
        cascade
        delay={100}
        duration={1000}
        direction="left"
        className="absolute top-[40%] w-[70%] left-[calc(dvw-80%)] h-auto"
      >
        <Section className="flex flex-col z-50 text-quaternary absolute w-full justify-center h-20 items-center py-2 bg-primary-alpha px-8">
          <Paragraph className="text-xs md:text-3xl capitalize font-medium my-2 text-center">
            {imageDesc[`${index + (1 % imageDesc.length)}`]}
          </Paragraph>
        </Section>
      </Fade>
      <Fade
        cascade
        delay={100}
        duration={1000}
        direction="left"
        className="absolute bottom-[5%]"
      >
        <Pagination
          className=""
          currentIndex={index}
          handleNext={handleNext}
          pageNumber={imageUrls.length}
          handlePrevious={handlePrevious}
        />
      </Fade>
    </Section>
  );
}

export default Carousel;
