import { TBaseElement } from "@/packages/types/ui/base.type";

export interface TForm extends TBaseElement {
  onSubmit: () => void;
}