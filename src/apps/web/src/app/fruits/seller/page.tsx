import React from "react";
import Hero from "@/packages/ui/src/organisms/hero";
import Fragment from "@/packages/ui/src/atoms/fragment";
import Testimonials from "@/packages/ui/src/organisms/testimonials";
import PartnerHighlights from "@/packages/ui/src/organisms/partnerHighlights";

function SellerPage() {
  return (
    <Fragment className="min-h-screen flex flex-col w-full justify-between">
      <Hero
        hasLink
        width={700}
        height={395}
        isLoading={false}
        href="/fruits/order"
        buttonText="Start Selling"
        onClickButton={undefined}
        imageSrc={"/images/fruit-platter-004.webp"}
        imgClass="w-full h-full bg-cover bg-no-repeat"
        className="w-full h-96 flex flex-col justify-center items-center mt-16"
        texts={[
          {
            label: "Seller",
            labelClass:
              "mdx:left-[22%] tracking-widest font-semibold text-2xl md:text-5xl",
          },
          {
            label: `Trusted trade platform offering higher savings,`,
            labelClass:
              "mdx:left-[22%] tracking-wide font-semibold text-xl md:text-3xl",
          },
          {
            label: "supply predictability & traceability.",
            labelClass: "mdx:left-[22%] mdx:w-[58%] text-3xl",
          },
        ]}
        textClass="font-semibold text-md md:text-2xl text-center font-sans md:tracking-wider md:text-3xl lg:text-5xl"
      />
      <PartnerHighlights />
      <Testimonials />
    </Fragment>
  );
}

export default SellerPage;
