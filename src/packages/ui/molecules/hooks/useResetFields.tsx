"use client";

import { useEffect } from 'react';
import { FieldErrors, UseFormReset, FieldValues } from 'react-hook-form';

function useResetFields(
  isDirty: boolean,
  errors: FieldErrors | { description: string, status: string },
  cb: () => UseFormReset<FieldValues> | unknown
) {

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (errors && !isDirty) timeout = setTimeout(() => cb(), 10000);
    return () => clearInterval(timeout);
  }, [errors, isDirty, cb]);
}

export default useResetFields;