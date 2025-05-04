import { ButtonHTMLAttributes, MouseEvent } from "react";

export interface TButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loader?: boolean;
}

export type TButtonMouseEvent = MouseEvent<HTMLButtonElement>;
