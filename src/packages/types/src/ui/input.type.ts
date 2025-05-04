import { InputHTMLAttributes } from "react";

export interface TInput extends InputHTMLAttributes<HTMLInputElement> {
  placeholderClassName: string;
}
