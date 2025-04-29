import { TBaseElement } from "@/packages/types/src/ui/base.type";

export interface TForm extends TBaseElement {
  onSubmit: () => void;
}