"use client";

import React from "react";
import { ZodSchema } from "zod";
import { useFieldArray } from "react-hook-form";
import Form from "@/packages/ui/src/atoms/form";
import { cn } from "@/packages/helpers/src/utils";
import { Button } from "@/packages/ui/src/atoms/button";
import FruitInput from "@/packages/ui/src/atoms/fruitInput";
import useFruit from "@/packages/ui/src/molecules/hooks/useFruit";
import { Plus, Apple, Info, Trash2, Leaf, Tag } from "lucide-react";
import useResetFields from "@/packages/ui/src/molecules/hooks/useResetFields";
import {
  FruitCategory,
  FruitCategorySchema,
} from "@/packages/helpers/src/validations/fruits.validate";

export default function AddFruitCategory() {
  const {
    toast,
    reset,
    watch,
    errors,
    isDirty,
    control,
    setValue,
    register,
    isSuccess,
    isPending,
    handleSubmit,
    onSubmitCategory,
  } = useFruit<FruitCategory, ZodSchema>(
    {
      name: "",
      description: "",
      kinds: [""],
    },
    FruitCategorySchema
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "kinds",
  });

  useResetFields(isDirty, errors, reset);

  return (
    <div className="min-h-screen bg-ghost-apple flex items-start justify-start">
      <div className="w-full max-w-lg outline outline-apple-green bg-inherit rounded-lg shadow-xl border border-slate-200 overflow-hidden">
        <header className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-white/20 p-1 rounded-lg backdrop-blur-sm">
              <Apple fill="" className="w-6 h-6 text-apple-green" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">
              Create Fruit Category
            </h1>
          </div>
        </header>

        <Form
          onSubmit={handleSubmit(onSubmitCategory)}
          className="p-8 space-y-4 wifull border-b-0 border-l-0 border-r-0 border-t border-t-apple-green rounded-t-none"
        >
          <div className="w-full">
            <FruitInput<FruitCategory>
              icon={Tag}
              reset={reset}
              control={control}
              setValue={setValue}
              disabled={isPending}
              label="Category Name"
              placeholder="e.g. Tropical"
              id={"name" as keyof FruitCategory}
              name={"name" as keyof FruitCategory}
              className="form-input bg-ghost-apple/80 text-black placeholder:text-secondary-text/40"
            />
          </div>

          <section>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-slate-800 capitalize tracking-wider">
                Varieties <span className="text-red-500">*</span>
              </label>
              <Button
                type="button"
                variant="ghost"
                onClick={() => append("")}
                className="flex items-center cursor-pointer gap-1 text-xs font-bold bg-ghost-apple text-apple-green px-3 py-1 rounded-full hover:bg-apple-green hover:text-ghost-apple transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> ADD VARIETY
              </Button>
            </div>

            <div className="space-y-3">
              {fields.length === 0 ? (
                <div
                  className={cn(
                    "flex flex-col items-center justify-center p-8 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-400",
                    errors.kinds ? "border-cherry" : ""
                  )}
                >
                  <Info className="w-6 h-6 mb-2" />
                  <p className="text-sm font-medium">No varieties added yet.</p>
                </div>
              ) : (
                fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-3 group animate-in slide-in-from-left-2 duration-200"
                  >
                    <div className="relative flex-1">
                      <FruitInput
                        icon={Leaf}
                        reset={reset}
                        control={control}
                        setValue={setValue}
                        disabled={isPending}
                        label={`Variety ${++index}`}
                        placeholder="Strawberry, Mango, etc."
                        id={`kinds.${index}` as keyof FruitCategory}
                        name={`kinds.${index}` as keyof FruitCategory}
                        className="form-input bg-ghost-apple/80 text-black placeholder:text-secondary-text/40 outline-none transition-all shadow-sm"
                      />
                      <span className="absolute left-0 top-[70%] -translate-y-1/2 w-0.5 h-8 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => remove(index)}
                      className="p-3 text-slate-300 mt-6 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <label className="text-sm font-medium text-slate-800 capitalize tracking-wider mb-3 block">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              className={cn(
                "w-full px-5 py-4 bg-ghost-apple/80 ring ring-slate-400 rounded-lg h-32 focus:border-emerald-500 outline-none placeholder:italic placeholder:text-slate-300 transition-all resize-none text-sm shadow-inner",
                errors.description
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              )}
              placeholder="Flavor profiles, seasonality, etc."
            />
          </section>

          <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isPending || !isDirty}
              className={cn(
                "px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150",
                isPending || !isDirty
                  ? "cursor-not-allowed disabled:opacity-50"
                  : "cursor-pointer"
              )}
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-6 py-2 border border-transparent rounded-lg shadow-md text-sm font-medium disabled:opacity-50 transition duration-150"
            >
              Create Fruit Category
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
