import React, { SVGProps } from "react";

const SVGGoogleComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Apple"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    {...props}
  >
    <defs>
      <style>
        {
          ".cls-1{fill:#f0432c;}.cls-2{fill:#ffbf00;}.cls-3{fill:#24aa49;}.cls-4{fill:#3384fc;}"
        }
      </style>
    </defs>
    <title />
    <path
      className="cls-1"
      d="m11.25 11.656 8.133 8.133a17.539 17.539 0 0 1 25.125 -0.125l8.125 -8.136a29.041 29.041 0 0 0 -41.375 0.125Z"
    />
    <path
      className="cls-2"
      d="m11.356 52.47 8.125 -8.125a17.543 17.543 0 0 1 0.125 -24.839L11.476 11.375a29.044 29.044 0 0 0 -0.125 41.1Z"
    />
    <path
      className="cls-3"
      points="301.98 301.84 301.98 302.8 302.94 302.8 301.98 301.84"
      d="M37.748 37.73L37.748 37.85L37.867 37.85L37.748 37.73Z"
    />
    <path
      className="cls-3"
      d="M31.938 61.026a28.956 28.956 0 0 0 20.569 -8.537L44.375 44.355a17.538 17.538 0 0 1 -24.875 0l-8.125 8.125a28.956 28.956 0 0 0 20.563 8.546"
    />
    <path
      className="cls-4"
      d="m60.545 26.291 -22.677 0.031v11.527h10.73a17.587 17.587 0 0 1 -4.211 6.614l8.131 8.133a29.081 29.081 0 0 0 8.027 -26.305"
    />
  </svg>
);

export default SVGGoogleComponent;
