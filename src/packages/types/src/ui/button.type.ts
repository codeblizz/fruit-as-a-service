import { TBaseElement } from "./base.type";

export interface TButton extends TBaseElement {
    text: string;
    onSubmit?: () => void;
    type?: "submit" | "reset" | "button" | undefined;
}
