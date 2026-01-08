import React from "react";
import NextLink from "../atoms/link";
import NextImage from "../atoms/image";
import { cn } from "@/packages/helpers/src/utils";

function AppLogoComponent({
  containerClassName,
  imageClassName,
  isMobileView = false,
}: {
  isMobileView?: boolean;
  imageClassName?: string;
  containerClassName?: string;
}) {
  return (
    <NextLink
      href="/"
      className={cn("flex justify-between items-center", containerClassName)}
    >
      <NextImage
        width={96}
        height={96}
        alt="faas-logo"
        priority={true}
        src="/images/faas-logo-512.png"
        className={cn(
          "size-auto mt-2 object-contain rounded-full",
          imageClassName
        )}
      />
      {!isMobileView ? (
        <div className="flex flex-col justify-center items-center -ml-8">
          <span className="text-sm font-bold text-gradient">
            Fruit as a Service
          </span>
          <span className="text-xs text-secondary-text pl-2">
            Fresh • Fast • Reliable
          </span>
        </div>
      ) : null}
    </NextLink>
  );
}

export default AppLogoComponent;
