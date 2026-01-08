"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import { FieldValues, useController } from "react-hook-form";
import { IBaseHookForm } from "@/packages/types/src/base.type";

function ErrorField<T extends FieldValues>({
  name,
  control,
  className,
}: Pick<IBaseHookForm<T>, "control" | "name"> & { className: string }) {

  const {
    fieldState: { error },
  } = useController({ control, name });

  return error ? (
    <span
      role="alert"
      className={lib.cn([
        "text-[11px] text-cherry font-ghost-apple drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)] overflow-hidden text-ellipsis",
        className,
      ])}
    >
      {error?.message}
    </span>
  ) : null;
}

export default ErrorField;
