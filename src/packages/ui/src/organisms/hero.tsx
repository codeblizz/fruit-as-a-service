"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import NextLink from "@/packages/ui/src/atoms/link";
import Button from "@/packages/ui/src/atoms/button";
import NextImage from "@/packages/ui/src/atoms/image";
import Section from "@/packages/ui/src/atoms/section";
import Fragment from "@/packages/ui/src/atoms/fragment";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import Skeleton from "@/packages/ui/src/molecules/skeleton";
import { THeroLabel, THeroType } from "@/packages/types/src/ui/image.type";

export default function Hero({
  href,
  texts,
  width,
  height,
  hasLink,
  imgClass,
  imageSrc,
  className,
  textClass,
  isLoading,
  buttonText,
  onClickButton,
}: THeroType) {
  return (
    <Section className={lib.cn(["relative", className])}>
      {isLoading ? (
        <Skeleton
          rows={8}
          columns={1}
          showCircle={false}
          className={lib.cn(["", imgClass])}
        />
      ) : (
        <NextImage
          alt="hero"
          width={width}
          height={height}
          priority={true}
          className={imgClass}
          style={{ objectFit: "cover" }}
          src={imageSrc ? imageSrc : "/images/noImage.webp"}
        />
      )}
      {isLoading ? null : (
        <Section className="absolute w-full flex flex-col justify-center items-center -space-y-1 md:space-y-2 mdx:space-y-6 top-[10%] sm:top-[16%] md:top-[22%] lg:top-[24%] xl:top-[28%]">
          <Fragment className="w-full text-quaternary flex flex-col justify-center space-y-1 md:space-y-4 mdx:space-y-6 items-center">
            {Array.isArray(texts) ? (
              texts.map((text: THeroLabel, idx: number) => (
                <Paragraph
                  key={idx}
                  className={lib.cn(
                    "w-full overflow-x-hidden text-ellipsis text-nowrap mdx:left-[22%] text-center",
                    text.labelClass
                  )}
                >
                  {text.label}
                </Paragraph>
              ))
            ) : (
              <Paragraph className={textClass}>{texts}</Paragraph>
            )}
          </Fragment>
          <Fragment className="inline-flex justify-center items-center w-full py-4">
            {buttonText &&
              (hasLink ? (
                <NextLink
                  href={href}
                  className={
                    "flex flex-col border text-quaternary justify-center bg-cranberry items-center text-center whitespace-nowrap text-sm rounded-2xl px-3 md:px-5 h-5 md:text-md md:h-8"
                  }
                >
                  {buttonText}
                </NextLink>
              ) : (
                <Button
                  onClick={onClickButton}
                  className="flex flex-col border justify-center items-center text-center whitespace-nowrap text-sm rounded-2xl px-3 md:px-5 h-5 md:text-md md:h-8"
                >
                  {buttonText}
                </Button>
              ))}
          </Fragment>
        </Section>
      )}
    </Section>
  );
}
