import React, { SVGProps } from "react";

const SVGXComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={65.44}
    viewBox="0 0 64 65.44"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_1_2)">
      <path
        d="M38.089 27.695 61.914 0h-5.646L35.581 24.047 19.057 0H0l24.986 36.364L0 65.406h5.646l21.847 -25.395 17.45 25.395H64L38.087 27.695zM30.355 36.684l-2.532 -3.621 -20.143 -28.813h8.672l16.256 23.253 2.532 3.621 21.131 30.225H47.599L30.355 36.686z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_2">
        <path width={1200} height={1227} fill="white" d="M0 0H64V65.44H0V0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SVGXComponent;
