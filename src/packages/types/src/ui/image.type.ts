import { StaticImageData } from 'next/image';
import React, { ReactElement, SVGProps, StyleHTMLAttributes } from 'react';

export type THeroLabel = {
  label: string;
  labelClass: string;
};

export type THeroType = {
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
  texts: THeroLabel[] | string;
};

export type TSocialImageSrcType = {
  url: string;
  name: string;
  label: string;
  isSSOButton: boolean;
  style: StyleHTMLAttributes<ReactElement>;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
};

export type TImageDefaultType = string | Blob | MediaSource;

export type IFileType = {
  name: string;
  size: number;
  type: string;
};

export type TCompressedImgOptionsType = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: number;
};

export type TImageElement = React.ImgHTMLAttributes<HTMLImageElement>;

export type TImageType = {
  alt: string;
  id?: number;
  className?: string;
  onClick?: () => void;
  width?: number | `${number}`;
  src: string | StaticImageData;
  height?: number | `${number}`;
};
