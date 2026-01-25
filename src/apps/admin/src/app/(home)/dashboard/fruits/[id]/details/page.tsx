"use client";

import { ZodSchema } from "zod";
import { usePathname, useSearchParams } from "next/navigation";
import lib from "@/packages/helpers/src/libs";
import React, { MouseEvent, useState } from "react";
import Modal from "@/packages/ui/src/molecules/modal";
import { useCreateStore } from "@/packages/store/src";
import Section from "@/packages/ui/src/atoms/section";
import { zodResolver } from "@hookform/resolvers/zod";
import CONSTANT from "@/packages/helpers/src/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import useFruit from "@/packages/ui/src/molecules/hooks/useFruit";
import { TPriceCardDetails } from "@/packages/types/src/fruits.type";
import FruitHeader from "@/packages/ui/src/organisms/fruits/fruitHeader";
import NofruitFound from "@/packages/ui/src/organisms/fruits/noFruitFound";
import PriceCardDetails from "@/packages/ui/src/molecules/priceCardDetails";
import FruitBreadCrumb from "@/packages/ui/src/organisms/fruits/fruitBreadCrumb";
import {
  FruitFormInput,
  FruitSchema,
  PriceCardDetailSchema,
} from "@/packages/helpers/src/validations/fruits.validate";

const defaultValues = {
  price: 0,
  rating: 0,
  title: "",
  cardNo: "",
  imageSrc: "",
  sellerName: "",
  description: "",
};

function PriceCardDetailPage({ className }: { className: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams().get("id");
  const fruitParamsId = pathname.split("/").pop();
  const { fruits } = useFruit<FruitFormInput, ZodSchema>(
    CONSTANT.defaultFruitValues,
    FruitSchema
  );
  const { updateModal, setLoader } = useCreateStore((state) => state);
  const [editedCard, setEditedCard] = useState({ cardNo: "", status: false });
  const {
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty, errors, isLoading, isSubmitting, isSubmitSuccessful },
  } = useForm<TPriceCardDetails>({
    defaultValues,
    resolver: zodResolver(PriceCardDetailSchema),
  });

  const onSave: SubmitHandler<TPriceCardDetails> = (data) => {
    console.log("data", data);
    setEditedCard({ cardNo: "", status: false });
  };

  const onDeleteImage = (imageSrc: string) => {
    console.log("imageSrc to delete", imageSrc);
  }

  const onEditOrCancel = (
    e: MouseEvent<HTMLButtonElement>,
    cardDetails: TPriceCardDetails
  ) => {
    setLoader(true);
    e.preventDefault();
    e.stopPropagation();
    const action = e.currentTarget.name;
    setEditedCard({ cardNo: cardDetails.cardNo, status: true });
    // if (action === "edit") {
    //   if (cardDetails.cardNo !== editedCard.cardNo) {
    //     updateModal({
    //       status: true,
    //       isOpen: true,
    //       title: "Unsaved Card Details",
    //       message: "You have an unsaved edit card details",
    //     });
    //   }
    // }
    if (action === "cancel") setEditedCard({ cardNo: "", status: false });
    (Object.keys(cardDetails) as Array<keyof TPriceCardDetails>).forEach(
      (key) => {
        setValue(key, cardDetails[key]);
      }
    );
    setLoader(false);
  };

  console.log("fruitParamsId", fruitParamsId);

  return (
    <Section
      className={lib.cn([
        // "flex flex-col gap-3 justify-start px-4 py-2 items-center border-2 border-l-1 my-16 border-plum",
        "space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500",
        className,
      ])}
    >
      <FruitBreadCrumb />
      <FruitHeader
        className=""
        subTitle="Intelligence"
        title="Global Inventory"
        subClassName="flex flex-col md:flex-row md:items-center"
        message="Monitor your seasonal stock levels, adjust market pricing, and
            review producer certifications from your central logistics hub."
      />
      <Section className="space-y-6 animate-in fade-in duration-500">
        {fruits.map((fruit) => {
          if (!searchParams || typeof searchParams === "undefined") return <NofruitFound />;
          if (fruit.fruitId === searchParams) {
            return (
              <PriceCardDetails
                key={fruit.id}
                onSave={onSave}
                control={control}
                setValue={setValue}
                getValues={getValues}
                isLoading={isLoading}
                rating={fruit?.rating}
                images={fruit?.images}
                edit={editedCard.status}
                cardNo={String(fruit.id)}
                title={fruit?.commonName}
                handleSubmit={handleSubmit}
                onDeleteImage={onDeleteImage}
                onEditOrCancel={onEditOrCancel}
                description={fruit?.description}
                price={fruit?.inventory[0]["unitPrice"] ?? 0}
                sellerName={fruit?.inventory[0]["supplier"] ?? ""}
              />
            );
          }
        })}
      </Section>
      <Modal isLoading={isLoading} />
    </Section>
  );
}

export default PriceCardDetailPage