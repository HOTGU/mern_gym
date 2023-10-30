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

export interface FileInputProps {
  name: string;
  control: Control;
  errors: FieldErrors;
  required?: boolean;
  label: string;
  disabled: boolean;
  isMulti?: boolean;
}

export interface TextareaProps {
  name: string;
  control: Control;
  errors: FieldErrors;
  required?: boolean;
  label: string;
  disabled?: boolean;
  small?: boolean;
}
