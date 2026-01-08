import React, { SVGProps } from "react";

const SVGXDarkComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={65.44}
    viewBox="0 0 64 65.44"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M38.089 27.695 61.914 0h-5.646L35.581 24.047 19.057 0H0l24.986 36.364L0 65.406h5.646l21.847-25.395 17.45 25.395H64L38.087 27.695zm-7.734 8.989-2.532-3.621L7.68 4.25h8.672l16.256 23.253 2.532 3.621 21.131 30.225h-8.672L30.355 36.686z"
        fill="#ADF0C7"
        stroke="#ADF0C7"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#ADF0C7" stroke="#ADF0C7" d="M0 0h64v65.44H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SVGXDarkComponent;
