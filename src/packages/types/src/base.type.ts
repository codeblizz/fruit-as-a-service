import { ReactNode } from "react";
import {
  Path,
  Control,
  FormState,
  FieldErrors,
  FieldValues,
  UseFormWatch,
  UseFormReset,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  UseFormHandleSubmit,
} from "react-hook-form";

export interface IBaseElement {
  id?: string;
  name: string;
  className: string;
  children?: ReactNode;
}

export interface IBaseHookForm<T extends FieldValues> {
  name: Path<T>;
  isDirty: boolean;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  reset: UseFormReset<T>;
  formState: FormState<T>;
  control?: Control<T, any, T>;
  register: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
}
