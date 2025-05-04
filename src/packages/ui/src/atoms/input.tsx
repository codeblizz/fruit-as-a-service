"use client";

import React, { useState } from "react";
import lib from "@/packages/helpers/src/libs";
import Label from "@/packages/ui/src/atoms/label";
import { TInput } from "@/packages/types/src/ui/input.type";
import ErrorField from "@/packages/ui/src/molecules/errorField";
import PasswordIcon from "@/packages/ui/src/molecules/passwordIcon";
import { TButtonMouseEvent } from "@/packages/types/src/ui/button.type";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
function Input<T extends FieldValues>({
  id,
  name,
  type,
  control,
  className,
  placeholder,
  placeholderClassName,
}: TInput & UseControllerProps<T>) {
  const isPassword = type === "password";
  const isCheckbox = type === "checkbox";
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { field } = useController({ control, name });

  const InputLabelField = () => (
    <Label
      id={id}
      htmlFor={id}
      className={lib.cn([
        !isCheckbox
          ? focus
            ? "inline-block absolute -translate-y-[60%] text-center bg-quaternary transition ease-in-out duration-100 text-secondary text-xs px-1 z-10 origin-0"
            : "hidden"
          : "text-slate-700 cursor-pointer text-xs overflow-hidden text-ellipsis text-nowrap",
        placeholderClassName,
      ])}
    >
      {placeholder}
    </Label>
  );

  const onShowPassword = (e: TButtonMouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setShowPassword(!showPassword);
  }

  return (
    <section className={lib.cn(["flex flex-col relative", "w-full"])}>
      {isCheckbox ? (
        <section className="inline-flex items-center justify-start gap-x-1 md:gap-x-2 w-full flex-nowrap">
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
          <InputLabelField />
          <ErrorField<T> className="relative" control={control} name={name} />
        </section>
      ) : (
        <>
          <InputLabelField />
          <input
            {...field}
            id={id}
            name={name}
            ref={field.ref}
            autoComplete="on"
            value={field.value}
            onBlur={field.onBlur}
            disabled={field.disabled}
            onChange={field.onChange}
            onFocus={() => setFocus(!focus)}
            placeholder={focus ? "" : placeholder}
            type={isPassword && showPassword ? "text" : type}
            className={lib.cn([
              "rounded-lg px-2 h-12 text-sm ring ring-slate-400 placeholder:italic placeholder:text-xs focus:outline-none",
              className,
            ])}
          />
          <ErrorField<T> className="" control={control} name={name} />
          <PasswordIcon
            isPassword={isPassword}
            onClick={onShowPassword}
            showPassword={showPassword}
            className="absolute top-4 right-3 cursor-pointer"
          />
        </>
      )}
    </section>
  );
}

export default Input;
