import { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isPending?: boolean;
}

export type TButtonMouseEvent = MouseEvent<HTMLButtonElement>;
