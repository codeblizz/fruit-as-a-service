"use client";

import React from "react";
import Image, { ImageProps } from "next/image";

type ImageType = {
  className?: string;
  onClick?: () => void;
};
function NextImage({
  src,
  alt,
  width,
  height,
  onClick,
  className,
  ...rest
}: ImageType & ImageProps) {

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