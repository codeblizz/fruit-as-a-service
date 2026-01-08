"use client";

import { useEffect, useRef } from "react";
import { FieldErrors, UseFormReset, FieldValues } from "react-hook-form";

function useResetFields(
  isDirty: boolean,
  errors: FieldErrors | { description: string; status: string },
  cb: () => UseFormReset<FieldValues | any> | unknown
) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    // const hasError = !!errors && (typeof errors === 'object' && !Array.isArray(errors) && Object.keys(errors).length > 0);
    const hasError =
      Object.prototype.toString.call(errors) === "[object Object]" &&
      (Object.keys(errors).length > 0 ||
        ("description" in errors && "status" in errors));
    if (hasError && !isDirty) {
      const timeout = setTimeout(() => {
        if (typeof cbRef.current === "function") {
          cbRef.current();
        }
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [errors, isDirty, cb]);
}

export default useResetFields;
