import React from "react";
import { cls } from "../libs/util";
import { ButtonProps } from "../types/globalTypes";

const Button = ({
  onAction,
  label,
  disabled,
  theme = "primary",
  small,
}: ButtonProps) => {
  return (
    <button
      className={cls(
        "rounded font-bold w-full disabled:cursor-not-allowed disabled:opacity-70 transition",
        small ? "p-3" : "p-5",
        theme === "primary"
          ? " bg-teal-500 text-white hover:bg-teal-400"
          : theme === "secondary"
          ? "border-2 border-teal-500 text-teal-500 hover:bg-neutral-100"
          : "text-neutral-600 hover:bg-neutral-100"
      )}
      onClick={onAction}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
