"use client";

import Section from "./section";
import React, { useState } from "react";
import lib from "@/packages/helpers/src/libs";
import Label from "@/packages/ui/src/atoms/label";
import { IInput } from "@/packages/types/src/ui/input.type";
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
  labelClassName,
}: IInput & UseControllerProps<T>) {
  const isPassword = type === "password";
  const isCheckbox = type === "checkbox";
  const [showPassword, setShowPassword] = useState(false);
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const inputId = id || name;

  const InputLabelField = () => (
    <Label
      htmlFor={name}
      className={lib.cn(
        "text-ghost-apple transition-all z-10 px-2 ease-in-out duration-500",
        isCheckbox
          ? "cursor-pointer text-xs overflow-hidden text-ellipsis text-nowrap"
          : "hidden absolute opacity-0 inline-block top-1/2 transform -translate-y-1/2 peer-focus:opacity-100 peer-focus:-translate-y-[145%] peer-focus:scale-75 peer-focus:bg-fig peer-focus:px-2" +
              "peer-not-placeholder-shown:-translate-y-[145%] peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:bg-fig",
        labelClassName,
        error && !isCheckbox ? "text-red-500 peer-focus:text-red-500" : "",
        type === "password" ? "-left-1" : ""
      )}
    >
      {placeholder}
    </Label>
  );

  const onShowPassword = (e: TButtonMouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <Section className={lib.cn("relative flex flex-col w-full")}>
      {isCheckbox ? (
        <Section className="inline-flex items-center justify-start gap-x-1 w-full flex-nowrap">
          <input
            {...field}
            id={inputId}
            name={name}
            type={type}
            ref={field.ref}
            // checked={field.value}
            // onChange={field.onChange}
            className={lib.cn([
              "ring-0 p-0 focus:outline-none accent-gray-800 cursor-pointer",
              className,
            ])}
          />
          <InputLabelField />
          <ErrorField<T>
            className="absolute -bottom-2"
            control={control}
            name={name}
          />
        </Section>
      ) : (
        <div className="relative flex flex-col-reverse">
          <input
            {...field}
            id={inputId}
            name={name}
            ref={field.ref}
            autoComplete="on"
            // value={field.value}
            disabled={field.disabled}
            // onChange={field.onChange}
            placeholder={placeholder}
            type={isPassword && showPassword ? "text" : type}
            className={lib.cn([
              "rounded-lg w-full px-2 h-12 text-sm ring-1 ring-slate-400 placeholder:italic placeholder:text-xs placeholder:inline-flex focus:outline-none peer transition-all focus:placeholder-transparent",
              className,
              error ? "ring-red-500 focus:ring-red-500" : "",
            ])}
          />
          <InputLabelField />
          <ErrorField<T>
            className="absolute left-0 -bottom-4"
            control={control}
            name={name}
          />
          <PasswordIcon
            isPassword={isPassword}
            onClick={onShowPassword}
            showPassword={showPassword}
            className="absolute top-4 cursor-pointer right-2 text-blackcurrant/80"
          />
        </div>
      )}
    </Section>
  );
}

export default Input;
