"use client";

import React, { useMemo, ReactElement } from "react";
import { XCircle, CheckCircle } from "lucide-react";
import { useCreateStore } from "@/packages/store/src";

export default function useNotification({
  isSuccess,
  errors,
  reset,
  message,
}: any) {
  const { updateToast, toast } = useCreateStore((state) => state);
  const NotificationCard = useMemo(() => {
    if (!isSuccess && !errors) return null;

    const Icon = isSuccess ? CheckCircle : XCircle;
    const title = isSuccess ? "Fruit Created Successfully!" : "Creation Failed";
    const cardClass = isSuccess
      ? "bg-green-100 border-green-400 text-green-800"
      : "bg-red-100 border-red-400 text-red-800";
    const buttonText = isSuccess ? "Add Another Fruit" : "Try Again";

    return (
      <div
        className={`p-8 rounded-xl shadow-lg border ${cardClass} flex flex-col items-center text-center`}
      >
        <Icon
          className={`w-12 h-12 mb-4 ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        />
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm mb-6">{toast.message}</p>

        <button
          onClick={isSuccess ? () => reset() : () => updateToast(false, "", "")}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition duration-150 ${
            isSuccess
              ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
              : "bg-red-600 hover:bg-red-700 text-white shadow-md"
          }`}
        >
          {buttonText}
        </button>
      </div>
    );
  }, [isSuccess, errors, reset]);
  return {
    NotificationCard: NotificationCard as ReactElement,
  };
}
