"use client";

import { forwardRef, useEffect } from "react";
import utils from "@/packages/helpers/src/utils";
import { CalendarIcon, LucideIcon } from "lucide-react";
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseFormReset,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "id"> {
  id: Path<T>;
  name: Path<T>;
  label: string;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  reset?: UseFormReset<T>;
  icon?: LucideIcon;
  required?: boolean;
}

const FormInputInner = <T extends FieldValues>(
  {
    id,
    label,
    icon: Icon,
    name,
    setValue,
    reset,
    control,
    required = true,
    ...rest
  }: FormInputProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const {
    field,
    fieldState: { error, isDirty },
  } = useController({ control, name });

  const isDateType = rest.type === "date";
  const commonName = useWatch({ control, name: "commonName" as Path<T> });

  useEffect(() => {
    if (name === ("batchNumber" as Path<T>) && commonName) {      
      const newBatch = utils.generateBatchNumber(commonName);
      setValue("batchNumber" as Path<T>, newBatch as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [commonName, setValue, name]);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-cherry">*</span>}
      </label>
      <div className="relative rounded-lg shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon
              className={`h-5 w-5 ${error ? "text-cherry" : "text-gray-400"}`}
            />
          </div>
        )}
        <input
          {...field}
          id={id}
          type={rest.type || "text"}
          ref={ref}
          {...rest}
          className={`block w-full ${Icon ? "pl-10" : "pl-3"} ${
            isDateType ? "cursor-pointer appearance-none" : ""
          }
               pr-3 py-2 border rounded-lg outline-none placeholder:italic placeholder:text-xs placeholder:inline-flex placeholder:text-slate-400 focus:ring-slate-500 hover:border-slate-400 focus:border-slate-500 transition duration-150 ease-in-out disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm ${
                 error
                   ? "border-cherry focus:border-cherry focus:ring-cherry"
                   : "border-gray-300"
               }`}
          onClick={(e) => {
            if (isDateType) {
              try {
                (e.target as HTMLInputElement).showPicker();
              } catch (err) {
                /* Fallback for older browsers */
                console.log(err);
              }
            }
          }}
        />
        {isDateType && !error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="w-1 h-4 border-l border-slate-200 mr-2" />
            <CalendarIcon className="h-4 w-4 text-slate-300" />
          </div>
        )}
      </div>
      {error && (
        <p className="absolute -bottom-4 text-[0.6rem] !text-cherry animate-in fade-in slide-in-from-top-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

// FormInput.displayName = "FormInput";

const FormInput = forwardRef(FormInputInner) as <T extends FieldValues>(
  props: FormInputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;

export default FormInput;
