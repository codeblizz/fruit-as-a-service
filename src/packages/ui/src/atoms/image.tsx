"use client";

import React from "react";
import Image, { ImageProps } from "next/image";
import { TImageType } from "@/packages/types/src/ui/image.type";

function NextImage({
  src,
  alt,
  width,
  height,
  onClick,
  className,
  ...rest
}: TImageType & ImageProps) {

  return (
    <Image
      alt={alt}
      src={src}
      width={width}
      quality={100}
      height={height}
      onClick={onClick}
      className={className}
      {...rest}
    />
  );
}

export default NextImage;