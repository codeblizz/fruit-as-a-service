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
import { Store, useCreateStore } from "@/packages/store/src";
import CONSTANT from "@/packages/helpers/src/constants";
import {
  useState,
  useEffect,
  useCallback,
  useTransition,
  useRef,
} from "react";
import FruitService from "@/packages/services/src/fruits/fruit.service";
import {
  FruitFormData,
  FruitCategory,
  FruitInventory,
} from "@/packages/helpers/src/validations/fruits.validate";
import { FruitDetails } from "@/packages/types/src/fruits.type";
import { useValidList } from "./useValidFruitDetails";

export const revalidate = 60;

export default function useFruit<
  T extends FieldValues,
  S extends ZodType<any, any>
>(defaultValues: DefaultValues<T>, schema: S) {
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
  } = useCreateStore((state: Store) => state);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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

  const isNotFruitDefaultState = useCallback((fruit: FruitDetails) => {
    return (
      fruit.commonName?.trim() !== "" || fruit.botanicalName?.trim() !== ""
    );
  }, []);

  const validFruits = useValidList<FruitDetails>(
    fruits,
    isNotFruitDefaultState
  );
  const validCategories = useValidList<FruitCategory>(categories);
  const validInventories = useValidList<FruitInventory>(inventories);

  const fruitLength = validFruits.length;
  const fruitCategoryLength = validCategories.length;
  const fruitInventoryLength = validInventories.length;

  // ---------------- FETCHERS ----------------

  const fetchFruitCategories = useCallback(async () => {
    try {
      const response = await FruitService("categories").fetchFruitCategories();
      const { status, message, data } = response.data;
      if (status !== 200) throw new Error(message);
      updateFruitCategories(data);
    } catch (error) {
      const { message } = utils.formatError(error);
      updateToast(true, message || "Failed to load categories", "text-error");
      throw error;
    }
  }, [updateFruitCategories, updateToast]);

  const fetchAllFruits = useCallback(async () => {
    try {
      const response = (await FruitService<FruitFormData>(
        "fruits"
      ).fetchAllFruits()) as unknown as AxiosResponse;
      const { status, message, data } = response.data;
      if (status !== 200) throw new Error(message);
      updateFruits(data);
    } catch (error) {
      const { message } = utils.formatError(error);
      updateToast(true, message || "Failed to load fruits.", "text-error");
    }
  }, [updateFruits, updateToast]);

  const fetchAllFruitInventories = useCallback(async () => {
    try {
      const response = await FruitService<FruitInventory>(
        "inventories"
      ).fetchAllFruitInventories();
      const { status, message, data } = response.data;
      if (status !== 200) throw new Error(message);
      updateFruitInventories(data);
    } catch (error) {
      const { message } = utils.formatError(error);
      updateToast(true, message || "Failed to load fruit inventories.", "text-error");
    }
  }, [updateFruitInventories]);

  // ---------------- IMAGE HANDLING ----------------

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      setSelectedFiles((prev) => {
        const validFiles = files.filter(
          (file) => !prev.some((f) => f.name === file.name)
        );

        startTransition(() => {
          setImagePreviews((p) => [
            ...p,
            ...validFiles.map((file) => URL.createObjectURL(file)),
          ]);
        });

        return [...prev, ...validFiles];
      });
    },
    []
  );

  const removeImage = useCallback((index: number) => {
    setImagePreviews((prev) => {
      const copy = [...prev];
      if (copy[index]) URL.revokeObjectURL(copy[index]);
      copy.splice(index, 1);
      return copy;
    });

    setSelectedFiles((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  }, []);

  // ---------------- SUBMIT FRUIT ----------------

  const onSubmit = (data: any) => {
    if (selectedFiles.length < MIN_IMAGES) {
      updateToast(
        true,
        `Please upload at least ${MIN_IMAGES} images.`,
        "text-error"
      );
      return;
    }

    const submissionData = {
      ...data,
      harvestDate: new Date(data.harvestDate).toISOString().split("T")[0],
      expiryDate: new Date(data.expiryDate).toISOString().split("T")[0],
    };

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("metadata", JSON.stringify(submissionData));
        selectedFiles.forEach((file) => formData.append("images", file));

        const response = await FruitService<FruitFormData>(
          "fruits"
        ).addNewFruit(formData);

        const { status, data, message } = response.data;
        if (status !== 201) throw new Error();

        addFruit(data);
        updateToast(true, message, "text-success");
        reset(defaultValues);

        imagePreviews.forEach(URL.revokeObjectURL);
        setImagePreviews([]);
        setSelectedFiles([]);
      } catch (err) {
        const { message } = utils.formatError(err);
        updateToast(true, message || "An error occurred", "text-error");
      }
    });
  };

  // ---------------- DELETE FRUIT ----------------

  const handleDeleteFruit = useCallback(
    async (fruitId: string) => {
      try {
        await FruitService("fruits").removeFruit(fruitId);
        removeFruit(fruitId);
        updateToast(true, "Fruit removed successfully", "text-success");
      } catch (err) {
        updateToast(true, "Failed to delete fruit.", "text-error");
        throw new Error("Failed to delete fruit.");
      }
    },
    [removeFruit, updateToast]
  );

  // ---------------- CREATE CATEGORY ----------------

  const createNewCategory: SubmitHandler<FruitCategory> = (data) => {
    if (!data.name?.trim()) {
      updateToast(true, "Category name is required.", "text-error");
      return;
    }

    if (!data.kinds?.length || !data.kinds[0].trim()) {
      updateToast(true, "At least one kind is required.", "text-error");
      return;
    }

    startTransition(async () => {
      try {
        const response = (await FruitService("categories").createFruitCategory(
          data
        )) as unknown as AxiosResponse;

        const { status, message, data: categoryData } = response.data;
        if (status !== 201) throw new Error();

        updateFruitCategories(categoryData);
        updateToast(true, message, "text-success");
        reset();
      } catch (error) {
        const { message } = utils.formatError(error);
        updateToast(true, message || "An error occurred", "text-error");
      }
    });
  };

  // ---------------- EFFECTS ----------------

  useEffect(() => {
    if (isSubmitSuccessful && isSuccess) reset();

    if (selectedFiles.length) {
      setValue("images", selectedFiles as any, { shouldValidate: true });
    }
  }, [selectedFiles, setValue, isSubmitSuccessful, isSuccess, reset]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    startTransition(async () => {
      try {
        const tasks: Promise<any>[] = [];

        if (!fruitCategoryLength) tasks.push(fetchFruitCategories());
        if (!fruitLength) tasks.push(fetchAllFruits());
        if (!fruitInventoryLength) tasks.push(fetchAllFruitInventories());

        await Promise.allSettled(tasks);
      } catch {
        updateToast(
          true,
          "Limited data may be available due to connection.",
          "text-warning"
        );
      }
    });
  }, [
    fruitLength,
    fruitCategoryLength,
    fruitInventoryLength,
    fetchAllFruits,
    fetchFruitCategories,
    fetchAllFruitInventories,
    updateToast,
  ]);

  // ---------------- API ----------------

  return {
    watch,
    reset,
    toast,
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
    fruits: validFruits,
    fruitCategories: validCategories,
    fruitInventories: validInventories,
    onSubmitCategory: createNewCategory,
  };
}
