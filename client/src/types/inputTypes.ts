import { Control, FieldErrors } from "react-hook-form";

export interface InputProps {
  type?: "text" | "email" | "password";
  name: string;
  control: Control;
  errors: FieldErrors;
  required?: boolean;
  label: string;
  disabled?: boolean;
  small?: boolean;
}
