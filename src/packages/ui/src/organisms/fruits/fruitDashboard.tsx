"use client";

import Modal from "../../molecules/modal";
import { ShoppingCart } from "lucide-react";
import lib from "@/packages/helpers/src/libs";
import FruitBreadCrumb from "./fruitBreadCrumb";
import React, { MouseEvent, useState } from "react";
import { useCreateStore } from "@/packages/store/src";
import Section from "@/packages/ui/src/atoms/section";
import { zodResolver } from "@hookform/resolvers/zod";
import CONSTANT from "@/packages/helpers/src/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useSearchParams } from "next/navigation";
import useFruit from "@/packages/ui/src/molecules/hooks/useFruit";
import { TPriceCardDetails } from "@/packages/types/src/fruits.type";
import PriceCardDetails from "@/packages/ui/src/molecules/priceCardDetails";
import { PriceCardDetailSchema } from "@/packages/helpers/src/validations/fruits.validate";
import FruitHeader from "./fruitHeader";

const defaultValues = {
  price: 0,
  rating: 0,
  title: "",
  cardNo: "",
  imageSrc: "",
  sellerName: "",
  description: "",
};

function FruitDashboard({ className }: { className: string }) {
  const pathname = usePathname();
  // const { fruitCategories, fruit } = useFruit();
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

  const onEditOrCancel = (
    e: MouseEvent<HTMLButtonElement>,
    cardDetails: TPriceCardDetails
  ) => {
    setLoader(true);
    e.preventDefault();
    e.stopPropagation();
    const action = e.currentTarget.name;
    setEditedCard({ cardNo: cardDetails.cardNo, status: true });
    if (action === "edit") {
      if (cardDetails.cardNo !== editedCard.cardNo) {
        updateModal({
          status: true,
          isOpen: true,
          title: "Unsaved Card Details",
          message: "You have an unsaved edit card details",
        });
      }
    }
    if (action === "cancel") setEditedCard({ cardNo: "", status: false });
    (Object.keys(cardDetails) as Array<keyof TPriceCardDetails>).forEach(
      (key) => {
        setValue(key, cardDetails[key]);
      }
    );
    setLoader(false);
  };

  // console.log("fruitCategories", fruitCategories);
  // console.log("fruit", fruit);

  return (
    <Section
      className={lib.cn([
        // "flex flex-col gap-3 justify-start px-4 py-2 items-center border-2 border-l-1 my-16 border-plum",
        "space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500",
        className,
      ])}
    >
      <FruitBreadCrumb />
      <FruitHeader />
      <Section className="grid grid-cols-3 gap-3">
        {CONSTANT.priceCardDetails.map((details) => (
          <PriceCardDetails
            onSave={onSave}
            control={control}
            setValue={setValue}
            key={details.index}
            getValues={getValues}
            title={details.title}
            isLoading={isLoading}
            price={details.price}
            cardNo={details.index}
            rating={details.rating}
            edit={editedCard.status}
            imageSrc={details.image}
            handleSubmit={handleSubmit}
            sellerName={details.sellerName}
            onEditOrCancel={onEditOrCancel}
            description={details.description}
          />
        ))}
      </Section>
      <Modal isLoading={isLoading} />
    </Section>
  );
}

export default FruitDashboard;
