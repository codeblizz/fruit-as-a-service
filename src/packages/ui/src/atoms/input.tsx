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
  placeholderClassName,
}: IInput & UseControllerProps<T>) {
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
            ? "inline-block absolute -translate-y-[60%] text-center transition-all ease-in-out duration-900 text-xs z-50 origin-0"
            : "hidden"
          : "cursor-pointer text-primary-text text-xs overflow-hidden text-ellipsis text-nowrap",
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
    <Section className={lib.cn(["relative flex flex-col w-full"])}>
      {isCheckbox ? (
        <Section className="inline-flex items-center justify-start gap-x-1 w-full flex-nowrap">
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
          <ErrorField<T> className="absolute" control={control} name={name} />
        </Section>
      ) : (
        <div className="">
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
              "rounded-lg w-full px-2 h-12 text-sm ring ring-slate-400 placeholder:italic placeholder:text-xs focus:outline-none",
              className,
            ])}
          />
          <ErrorField<T> className="absolute left-0 bottom-0" control={control} name={name} />
          <PasswordIcon
            isPassword={isPassword}
            onClick={onShowPassword}
            showPassword={showPassword}
            className="absolute top-4 cursor-pointer right-2 text-primary-text"
          />
        </div>
      )}
    </Section>
  );
}

export default Input;
