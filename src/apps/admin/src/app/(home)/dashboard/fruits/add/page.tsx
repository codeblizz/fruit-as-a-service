"use client";

import React, { FC } from "react";
import { Tag, AlignLeft } from "lucide-react";
import Form from "@/packages/ui/src/atoms/form";
import Section from "@/packages/ui/src/atoms/section";
import { Button } from "@/packages/ui/src/atoms/button";
import CONSTANT from "@/packages/helpers/src/constants";
import CustomSelect from "@/packages/ui/src/atoms/select";
import FruitInput from "@/packages/ui/src/atoms/fruitInput";
import useFruit from "@/packages/ui/src/molecules/hooks/useFruit";
import ImagePreviewer from "@/packages/ui/src/molecules/imagePreviewer";
import CountrySelector from "@/packages/ui/src/molecules/countrySelector";
import useResetFields from "@/packages/ui/src/molecules/hooks/useResetFields";
import useNotification from "@/packages/ui/src/molecules/hooks/useNotification";
import {
  FruitSchema,
  FruitFormData,
  FruitFormInput,
} from "@/packages/helpers/src/validations/fruits.validate";
import { cn } from "@/packages/helpers/src/utils";
import { Loader2 } from "lucide-react";
import { ZodSchema } from "zod";

const AddFruit: FC = () => {
  const MIN_IMAGES = CONSTANT.ADD_FRUIT_MIN_IMAGES;
  const defaultFruitValues = CONSTANT.defaultFruitValues;
  const {
    toast,
    reset,
    watch,
    errors,
    isDirty,
    control,
    setValue,
    register,
    onSubmit,
    isSuccess,
    isPending,
    removeImage,
    handleSubmit,
    imagePreviews,
    selectedFiles,
    setSelectedFiles,
    handleImageChange,
    watchedCommonName,
  } = useFruit<FruitFormInput, ZodSchema>(defaultFruitValues, FruitSchema);

  const selectedValue = watch("categoryName");

  // const message = isSuccess
  // ? `The fruit "${
  //     watchedCommonName || "Entry"
  //   }" has been added to the database.`
  // : errors;

  // const { NotificationCard } = useNotification({
  //   isSuccess, reset, message, errors
  // });

  useResetFields(isDirty, errors, reset);

  return (
    <Section className="min-h-screen flex gap-4 items-center justify-between font-sans">
      <Section className="w-full flex-1 max-w-xl bg-ghost-apple rounded-lg shadow-xl p-6 relative">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          New Fruit Entry
        </h1>
        <p className="text-gray-500 mb-4">
          Submit the detailed information for a new fruit variety.
        </p>

        {/* {isPending && (
          <Section className="absolute inset-0 bg-ghost-apple bg-opacity-80 flex items-center justify-center rounded-2xl z-10 transition-opacity duration-300">
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-10 w-10 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-4 text-indigo-600 font-medium">
                Saving fruit data...
              </p>
            </div>
          </Section>
        )} */}

        {/* Success/Error Notification */}
        {/* {(isSuccess || Object.values(errors).length > 0) && (
          <div className="mb-6">{NotificationCard}</div>
        )} */}

        {/* Main Form (Hidden when successful) */}
        {!isSuccess && (
          <Form
            name="addFruit"
            onSubmit={handleSubmit(
              (data) => {
                onSubmit(data);
              },
              (err) => {
                console.log("Validation Failed:", err);
              }
            )}
            className={cn(
              "space-y-6 py-6 px-4",
              isPending ? "pointer-events-none opacity-60" : ""
            )}
          >
            <Section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CONSTANT.formInputFruitDetails.map((data, index) => (
                <FruitInput<FruitFormData>
                  key={index}
                  reset={reset}
                  type={data.type}
                  icon={data.icon}
                  control={control}
                  label={data.label}
                  setValue={setValue}
                  disabled={isPending}
                  placeholder={data.placeholder}
                  id={data.id as keyof FruitFormInput}
                  name={data.id as keyof FruitFormInput}
                />
              ))}
              <CountrySelector
                control={control}
                disabled={isPending}
                name="originCountry"
                id="originCountry"
                label="Origin Country"
                className=""
                rules={{ required: "Select the fruit's home country" }}
              />
              <CustomSelect
                icon={Tag}
                name="categoryName"
                control={control}
                required
                label="Product Category"
                placeholder="Select a category"
                rules={{ required: "Select a category" }}
                options={Object.keys(CONSTANT.fruitMenu.categories).map(
                  (category) => {
                    return { value: category, label: category };
                  }
                )}
              />
              <ImagePreviewer
                MIN_IMAGES={MIN_IMAGES}
                removeImage={removeImage}
                selectedFiles={selectedFiles}
                imagePreviews={imagePreviews}
                className="col-span-full"
                handleImageChange={handleImageChange}
              />

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <textarea
                    id="description"
                    // name="description"
                    rows={4}
                    disabled={isPending}
                    {...register("description")}
                    placeholder="Detailed description of the fruit's taste, texture, and best use."
                    className={`block pl-11 pr-4 outline-none placeholder:italic py-2 w-full placeholder:text-slate-300 placeholder:ml-4 px-3 border rounded-lg focus:ring-slate-500 focus:border-slate-500 transition duration-150 ease-in-out disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${
                      errors.description
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <div className="absolute top-2 left-3 text-slate-300 pointer-events-none">
                    <AlignLeft className="h-5 w-5" />
                  </div>
                </div>
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600">
                    {typeof errors.description?.message === "string" && errors.description.message}
                  </p>
                )}
              </div>
            </Section>
            {/* Form Actions */}
            <div className="pt-5 border-t border-gray-100 mt-6 flex justify-end space-x-3">
              <Button
                type="button"
                onClick={() => reset()}
                disabled={isPending || !isDirty}
                className={cn(
                  "px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-ghost-apple hover:bg-gray-50 transition duration-150",
                  isPending || !isDirty
                    ? "cursor-not-allowed disabled:opacity-50"
                    : "cursor-pointer"
                )}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="px-6 py-2 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-tr from-apple-green via-primary to-kiwi text-ghost-apple hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
              >
                {isPending ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin text-slate-500"
                    />{" "}
                    Submitting ...
                  </>
                ) : (
                  "Add Fruit Entry"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Section>
      <Section className="w-auto bg-ghost-apple rounded-lg shadow-xl"></Section>
    </Section>
  );
};

export default AddFruit;
