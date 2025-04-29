"use client";

import React, { useState } from "react";
import lib from "@/packages/helpers/lib";
import { TInput } from "@/packages/types/ui/input.type";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type FocusOrBlur = {
  blur: boolean;
  focus: boolean;
};
function Input<T extends FieldValues>({
  id,
  name,
  type,
  control,
  className,
  placeholder,
}: TInput & UseControllerProps<T>) {
  const isCheckbox = type === "checkbox";
  const { field, fieldState } = useController({ control, name });
  const [focus, setFocus] = useState(false);

  return (
    <section
      className={lib.cn(["flex flex-col relative", "w-full"])}
    >
      {isCheckbox ? (
        <section className="inline-flex items-center justify-start gap-x-2">
          <input
            {...field}
            id={id}
            name={name}
            type={type}
            ref={field.ref}
            value={field.value}
            checked={field.value}
            onChange={field.onChange}
            className={lib.cn([
              "ring-0 p-0 focus:outline-none accent-gray-800 cursor-pointer",
              className,
            ])}
          />
          <label htmlFor={id} className="text-slate-700 cursor-pointer text-xs overflow-hidden text-ellipsis text-nowrap">
            {placeholder}
          </label>
        </section>
      ) : (
        <>
          <label
            className={lib.cn([
              focus
                ? "inline-block absolute -translate-y-[60%] text-center bg-quaternary transition ease-in-out duration-100 text-secondary text-xs px-1 z-10 origin-0"
                : "hidden",
            ])}
            htmlFor={id}
          >
            {placeholder}
          </label>
          <input
            {...field}
            id={id}
            name={name}
            type={type}
            ref={field.ref}
            autoComplete="on"
            value={field.value}
            onBlur={field.onBlur}
            disabled={field.disabled}
            onChange={field.onChange}
            onFocus={() => setFocus(!focus)}
            placeholder={focus ? "" : placeholder}
            className={lib.cn([
              "rounded-lg px-2 h-12 text-sm ring ring-slate-400 placeholder:italic placeholder:text-xs focus:outline-none",
              className,
            ])}
          />
          {fieldState.error ? (
            <i className="text-[11px] absolute left-0 -bottom-4 text-error overflow-hidden text-ellipsis">
              {fieldState.error?.message}
            </i>
          ) : (
            ""
          )}
        </>
      )}
    </section>
  );
}

export default Input;
