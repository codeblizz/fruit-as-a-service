import { HTMLAttributes } from "react";

export interface TFragment extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  custom?: boolean;
}
