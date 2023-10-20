import React from "react";
import { Control, FieldErrors, useController } from "react-hook-form";
import ReactSelect from "react-select";
import { getOptions } from "../../libs/util";

interface SelectProps {
  name: string;
  control: Control;
  errors: FieldErrors;
  options: {
    value: string;
    label: string;
  }[];
}

const Select = ({ options, name, control }: SelectProps) => {
  const { field } = useController({ name, control });
  const optionsObj = getOptions();

  const findValue = optionsObj.postCategoryOptions.find(
    (item) => item.value === field.value
  );

  return (
    <ReactSelect
      options={options}
      name={field.name}
      value={findValue}
      onChange={(item) => {
        if (!item) return;
        const value = item.value as string;
        field.onChange(value);
      }}
    />
  );
};

export default Select;
