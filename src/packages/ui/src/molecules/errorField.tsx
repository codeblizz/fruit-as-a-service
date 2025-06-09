"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import { FieldValues, useController } from "react-hook-form";
import { IBaseHookForm } from "@/packages/types/src/ui/base.type";

function ErrorField<T extends FieldValues>({
  name,
  control,
  className,
}: Pick<IBaseHookForm<T>, "control" | "name"> & { className: string }) {

  const { fieldState } = useController({ control, name });

  return fieldState.error ? (
    <span role="alert"
      className={lib.cn([
        "text-[11px] absolute left-0 bottom-3.5 text-error overflow-hidden text-ellipsis",
        className,
      ])}
    >
      {fieldState?.error?.message}
    </span>
  ) : null;
}

export default ErrorField;
