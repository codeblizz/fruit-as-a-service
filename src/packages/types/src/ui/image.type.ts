import { StaticImageData } from 'next/image';
import React, { ReactElement, SVGProps, StyleHTMLAttributes } from 'react';

export type HeroLabel = {
  label: string;
  labelClass: string;
};

export type HeroType = {
  href: string;
  width: number;
  height: number;
  imgClass: string;
  hasLink?: boolean;
  className: string;
  textClass: string;
  isLoading: boolean;
  buttonText: string;
  imageSrc: string | StaticImageData ;
  onClickButton?: () => void;
  texts: HeroLabel[] | string;
};

export type imgType = {
  imageId?: number;
  imageSrc?: string;
};

export type SocialImageSrcType = {
  url: string;
  name: string;
  label: string;
  isSSOButton: boolean;
  style: StyleHTMLAttributes<ReactElement>;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
};

export type ImageDefaultType = string | Blob | MediaSource;

export type fileType = {
  name: string;
  size: number;
  type: string;
};

export type compressedImgOptionsType = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: number;
};

export type ImageElement = React.ImgHTMLAttributes<HTMLImageElement>;

export type ImageType = {
  alt: string;
  className?: string;
  onClick?: () => void;
  width?: number | `${number}`;
  src: string | StaticImageData;
  height?: number | `${number}`;
};
