"use client";

import React from "react";
import { ZodSchema } from "zod";
import lib from "@/packages/helpers/src/libs";
import { usePathname } from "next/navigation";
import Modal from "@/packages/ui/src/molecules/modal";
import { useCreateStore } from "@/packages/store/src";
import Section from "@/packages/ui/src/atoms/section";
import useFruit from "@/packages/ui/src/molecules/hooks/useFruit";
import FruitHeader from "@/packages/ui/src/organisms/fruits/fruitHeader";
import FruitBreadCrumb from "@/packages/ui/src/organisms/fruits/fruitBreadCrumb";
import { FruitFormInput, FruitSchema } from "@/packages/helpers/src/validations/fruits.validate";
import CONSTANT from "@/packages/helpers/src/constants";

const defaultValues = {
  price: 0,
  rating: 0,
  title: "",
  cardNo: "",
  imageSrc: "",
  sellerName: "",
  description: "",
};

function FruitMainDashboard({ className }: { className: string }) {
  const pathname = usePathname();
  const { fruitCategories, fruits, fruitInventories } = useFruit<FruitFormInput, ZodSchema>(CONSTANT.defaultFruitValues, FruitSchema);
  const { loader } = useCreateStore((state) => state);

  console.log("fruits", fruits);
  // console.log("fruitInventories", fruitInventories);
  // console.log("fruitCategories", fruitCategories);

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
      <Section className="space-y-6 animate-in fade-in duration-500">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fruitInventories.map((inventory, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{inventory.batchNumber}</td>
                  <td className="px-6 py-4">{inventory.inventoryId}</td>
                  <td className="px-6 py-4">{inventory.unitPrice}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                      {inventory.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Modal isLoading={loader} />
    </Section>
  );
}

export default FruitMainDashboard;
