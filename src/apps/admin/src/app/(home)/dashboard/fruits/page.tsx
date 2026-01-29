"use client";

import React from "react";
import { ZodSchema } from "zod";
import { useRouter } from "next/navigation";
import lib from "@/packages/helpers/src/libs";
import Modal from "@/packages/ui/src/molecules/modal";
import { useCreateStore } from "@/packages/store/src";
import Section from "@/packages/ui/src/atoms/section";
import CONSTANT from "@/packages/helpers/src/constants";
import { FruitDetails } from "@/packages/types/src/fruits.type";
import useFruit from "@/packages/ui/src/molecules/hooks/useFruit";
import FruitHeader from "@/packages/ui/src/organisms/fruits/fruitHeader";
import NofruitFound from "@/packages/ui/src/organisms/fruits/noFruitFound";
import FruitBreadCrumb from "@/packages/ui/src/organisms/fruits/fruitBreadCrumb";
import {
  FruitFormInput,
  FruitSchema,
} from "@/packages/helpers/src/validations/fruits.validate";

function FruitMainDashboard({ className }: { className: string }) {
  const router = useRouter();
  const { fruits } = useFruit<FruitFormInput, ZodSchema>(
    CONSTANT.defaultFruitValues,
    FruitSchema
  );
  const { loader } = useCreateStore((state) => state);

  const hasData = fruits.length > 0;

  return (
    <Section
      className={lib.cn([
        "animate-in fade-in slide-in-from-bottom-2 duration-500",
        className,
      ])}
    >
      <Section className="bg-ghost-apple border border-quaternary/50 p-4 pb-0 md:p-6 md:pb-0 space-y-6">
        <FruitBreadCrumb />
        <FruitHeader
          className=""
          subClassName="flex flex-col md:flex-row md:items-center"
          subTitle="Intelligence"
          title="Global Inventory"
          message="Monitor your seasonal stock levels, adjust market pricing, and
        review producer certifications from your central logistics hub."
        />
      </Section>
      <Section className="space-y-6 animate-in fade-in duration-500">
        <div className="bg-ghost-apple border border-quaternary/50 overflow-hidden">
          <table className="w-full text-center">
            <thead className="w-full bg-ghost-apple text-slate-500 text-xs uppercase">
              <tr className="border border-quaternary/50">
                <th className="px-6 py-4 border-r">Item</th>
                <th className="px-6 py-4 border-r">Category</th>
                <th className="px-6 py-4 border-r">Harvest Date</th>
                <th className="px-6 py-4 border-r">Expiry Date</th>
                <th className="px-6 py-4 border-r">Stock</th>
                <th className="px-6 py-4 border-r">Unit Price</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="border border-quaternary/50 divide-y divide-slate-100">
              {hasData ? (
                fruits.map((fruit: FruitDetails, index: number) => {
                  return (
                    <tr
                      key={index}
                      onClick={() =>
                        router.push(`/dashboard/fruits/edit?id=${fruit.id}`)
                      }
                      className="hover:bg-slate-200 bg-ghost-apple text-slate-500 text-xs hover:cursor-pointer transition-colors border border-slate-100"
                    >
                      <td className="px-6 py-4 font-medium">
                        {fruit?.commonName}
                      </td>
                      <td className="px-6 py-4">{fruit?.categoryName}</td>
                      <td className="px-6 py-4">
                        {fruit?.inventory[0]["harvestDate"]}
                      </td>
                      <td className="px-6 py-4">
                        {fruit?.inventory[0]["expiryDate"]}
                      </td>
                      <td className="px-6 py-4">
                        {fruit?.inventory[0]["quantityAvailable"]}
                      </td>
                      <td className="px-6 py-4">
                        {fruit?.inventory[0]["unitPrice"]}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                          {fruit?.inventory[0]["status"]}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex justify-center items-center">
                      <NofruitFound />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>
      <Modal isLoading={loader} />
    </Section>
  );
}

export default FruitMainDashboard;
