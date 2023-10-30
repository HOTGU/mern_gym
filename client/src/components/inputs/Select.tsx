import React from "react";
import { Control, FieldErrors, useController } from "react-hook-form";
import ReactSelect from "react-select";
import { getOptions } from "../../libs/util";

interface SelectProps {
  name: string;
  control: Control;
  errors: FieldErrors;
  disabled?: boolean;
  options: {
    value: string;
    label: string;
  }[];
}

const Select = ({ options, name, control, disabled }: SelectProps) => {
  const { field } = useController({ name, control });

  const findValue = options.find((item) => item.value === field.value);

  return (
    <ReactSelect
      options={options}
      name={field.name}
      value={findValue}
      isDisabled={disabled}
      onChange={(item) => {
        if (!item) return;
        const value = item.value;
        field.onChange(value);
      }}
    />
  );
};

export default Select;
