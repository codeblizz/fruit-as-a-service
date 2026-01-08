"use client";

import {
  useForm,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { ZodType } from "zod";
import { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStore } from "@/packages/store/src";
import CONSTANT from "@/packages/helpers/src/constants";
import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import FruitService from "@/packages/services/src/fruits/fruit.service";
import {
  FruitFormData,
  FruitCategory,
  FruitInventory,
} from "@/packages/helpers/src/validations/fruits.validate";

export const revalidate = 60;

export default function useFruit<T extends FieldValues, S extends ZodType>(
  defaultValues: DefaultValues<T>,
  schema: S
) {
  const hasInitialized = useRef(false);
  const [isPending, startTransition] = useTransition();
  const {
    toast,
    fruits,
    addFruit,
    categories,
    updateToast,
    updateFruits,
    removeFruit,
    inventories,
    updateFruitCategories,
    updateFruitInventories,
  } = useCreateStore((state) => state);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [imagePreviews, setImagePreviews] = useState<any>([]);
  const isSuccess = toast.message.includes("success");
  const MIN_IMAGES = CONSTANT.ADD_FRUIT_MIN_IMAGES;

  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const watchedKinds = watch("kinds");
  const watchedCommonName = watch("commonName");
  const fruitCategoryLength = categories.length;
  const fruitLength = fruits.length;
  const fruitInventoryLength = inventories.length;

  useEffect(() => {
    if (isSubmitSuccessful && isSuccess) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const fetchFruitCategories = useCallback(async () => {
    try {
      const response = await FruitService("categories").fetchFruitCategories();
      const { status, message, data } = response.data;
      if (status !== 200) {
        throw new Error("Failed to fetch fruit categories.");
      }
      updateToast(true, message, "text-success");
      updateFruitCategories(data);
    } catch (error) {
      const { message } = utils.formatError(error);
      updateToast(true, message || "An error occurred", "text-error");
      throw error;
    }
  }, []);

  const fetchAllFruits = useCallback(async () => {
    try {
      const response = (await FruitService<FruitFormData>(
        "fruits"
      ).fetchAllFruits()) as unknown as AxiosResponse;
      console.log(
        "******* UseFruit Fetch All Fruits Response ********",
        response
      );
      const { status, message, data } = response.data;
      if (status !== 200) {
        throw new Error("Failed to fetch fruit categories.");
      }
      updateToast(true, message, "text-success");
      updateFruits(data);
    } catch (err) {
      throw new Error("Failed to load fruits. Please check connection.");
    }
  }, [updateFruits]);

  const fetchAllFruitInventories = useCallback(() => {
    startTransition(async () => {
      try {
        const response = await FruitService<FruitInventory>(
          "inventories"
        ).fetchAllFruitInventories();
        const { status, message, data } = response.data;
        if (status !== 200) {
          throw new Error("Failed to fetch fruit inventories.");
        }
        updateFruitInventories(data);
      } catch (err) {
        throw new Error(
          "Failed to load fruit inventories. Please check connection."
        );
      }
    });
  }, []);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initData = async () => {
      startTransition(async () => {
        try {
          await Promise.allSettled([
            fruitCategoryLength === 0
              ? fetchFruitCategories()
              : Promise.resolve(),
            fruitLength === 0
              ? fetchAllFruits()
              : Promise.resolve(),
            fruitInventoryLength === 0
              ? fetchAllFruitInventories()
              : Promise.resolve(),
          ]);
        } catch (error) {
          updateToast(
            true,
            "Limited data may be available due to connection.",
            "text-warning"
          );
        }
      });
    };

    initData();
  }, [
    fruitLength,
    // fruitCategoryLength,
    fruitInventoryLength,
    fetchFruitCategories,
    fetchAllFruits,
    fetchAllFruitInventories,
    updateToast,
  ]);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const validFiles = files.filter(
        (file) =>
          !selectedFiles.some((f: { name: string }) => f.name === file.name)
      );
      startTransition(() => {
        setSelectedFiles((prev: any) => [...prev, ...validFiles]);
        setImagePreviews((prev: any) => [
          ...prev,
          ...validFiles.map((file) => URL.createObjectURL(file)),
        ]);
      });
    },
    []
  );

  const removeImage = useCallback((index: number) => {
    setImagePreviews((prev: any) => {
      const newPreviews = [...prev];
      if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
    setSelectedFiles((prev: any) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  const onSubmit = (data: any) => {
    if (selectedFiles.length < MIN_IMAGES) {
      updateToast(
        true,
        `Please upload at least ${MIN_IMAGES} images.`,
        "text-error"
      );
      return;
    }

    const formattedHarvestDate = new Date(data.harvestDate)
      .toISOString()
      .split("T")[0];
    const formattedExpiryDate = new Date(data.expiryDate)
      .toISOString()
      .split("T")[0];

    const submissionData = {
      ...data,
      harvestDate: formattedHarvestDate,
      expiryDate: formattedExpiryDate,
    };

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("metadata", JSON.stringify(submissionData));
        selectedFiles.forEach((file: any) => formData.append("images", file));
        const response = await FruitService<FruitFormData>(
          "fruits"
        ).addNewFruit(formData);
        const { status, data, message } = response.data;
        if (status !== 201) {
          throw new Error("Failed to add fruit variety.");
        }
        addFruit(data);
        updateToast(true, message, "text-success");
        reset(defaultValues);
        setSelectedFiles([]);
        imagePreviews.forEach((preview:any) => URL.revokeObjectURL(preview));
        setImagePreviews([]);
      } catch (err) {
        const { message } = utils.formatError(err);
        updateToast(true, message || "An error occurred", "text-error");
      }
    });
  };

  const handleDeleteFruit = useCallback(
    async (fruitId: string) => {
      try {
        await FruitService("fruits").removeFruit(fruitId);
        removeFruit(fruitId);
        updateToast(true, "Fruit removed successfuly", "text-success")
      } catch (err) {
        updateToast(true, "Failed to delete fruit.", "text-error");
        throw new Error("Failed to delete fruit.");
      }
    },
    [removeFruit]
  );

  const createNewCategory: SubmitHandler<FruitCategory> = (data) => {
    if (!data.name || data.name.trim() === "") {
      updateToast(true, "Category name is required.", "text-error");
      return;
    }
    if (!data.kinds || data.kinds.length === 0 || data.kinds[0].trim() === "") {
      updateToast(true, "At least one kind is required.", "text-error");
      return;
    }
    startTransition(async () => {
      try {
        const response = (await FruitService("categories").createFruitCategory(
          data
        )) as unknown as AxiosResponse;
        console.log("*******UseFruit Category Response********", response);
        const { status, message, data: categoryData } = response.data;
        if (status !== 201) {
          throw new Error("Failed to create fruit category.");
        }
        updateFruitCategories(categoryData);
        updateToast(true, message, "text-success");
        reset();
      } catch (error) {
        const { message } = utils.formatError(error);
        updateToast(true, message || "An error occurred", "text-error");
      }
    });
  };

  useEffect(() => {
    fetchFruitCategories();
    setValue("images", selectedFiles as any, { shouldValidate: true });
  }, [selectedFiles, fetchFruitCategories, setValue]);

  return {
    watch,
    reset,
    toast,
    fruits,
    errors,
    control,
    isDirty,
    register,
    setValue,
    onSubmit,
    isPending,
    isSuccess,
    removeImage,
    updateToast,
    handleSubmit,
    imagePreviews,
    defaultValues,
    selectedFiles,
    setSelectedFiles,
    watchedCommonName,
    handleDeleteFruit,
    handleImageChange,
    isSubmitSuccessful,
    fruitCategories: categories,
    fruitInventories: inventories,
    onSubmitCategory: createNewCategory,
  };
}
