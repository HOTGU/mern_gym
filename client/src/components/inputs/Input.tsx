import React from "react";
import { useController } from "react-hook-form";
import { cls } from "../../libs/util";
import { InputProps } from "../../types/inputTypes";

const Input = ({
  type = "text",
  name,
  control,
  errors,
  required = false,
  label,
  disabled,
  small,
}: InputProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const { field } = useController({ name, control, rules: { required } });

  return (
    <div className={cls("relative w-full")}>
      <input
        ref={ref}
        type={type}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        disabled={disabled}
        className={cls(
          "w-full outline-none px-4 pt-6 pb-2 border-2 focus:border-neutral-700 rounded peer transition",
          small ? "px-4 pt-4 pb-2" : "px-4 pt-7 pb-3"
        )}
      />
      <div
        onClick={() => ref.current?.focus()}
        className={cls(
          "absolute origin-[0] font-bold left-4 text-xs scale-100 text-neutral-400 peer-placeholder-shown:scale-100 peer-focus:text-neutral-700 peer-focus:scale-105 cursor-text transition",
          small ? "top-1" : "top-2 "
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default Input;
