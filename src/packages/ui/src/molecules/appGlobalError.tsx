import React from "react";
import { IErrorProps } from "@/packages/types/src/utils.type";

function AppGlobalError({ error, reset }: IErrorProps) {
  return (
    <html lang="en">
      <body>
        <section className="min-h-screen w-full flex flex-col justify-center items-center">
          <p className="text-center text-5xl">{error.message}</p>
          <p className="text-center text-3xl">
            {"Contact us in the links below"}
          </p>
          <div className="flex">
            <p className="h-4 w-auto" onClick={() => reset()}>
             Try Again
            </p>
            <a href="/contact" className="h-3 w-auto">
              Contact Us
            </a>
          </div>
        </section>
      </body>
    </html>
  );
}

export default AppGlobalError;
