import React, { ChangeEvent, ChangeEventHandler } from "react";
import { FileInputProps } from "../../types/inputTypes";
import { useController } from "react-hook-form";

const File = ({
  name,
  control,
  errors,
  label,
  disabled,
  required,
  isMulti,
}: FileInputProps) => {
  const { field } = useController({ control, name, rules: { required } });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const array = [...field.value];

    if (!e.target.files) return;

    for (let i = 0; i < e.target.files.length; i++) {
      array.push(e.target.files[i]);
    }

    field.onChange(array);
  };

  return (
    <input
      multiple={isMulti}
      type="file"
      name={field.name}
      onChange={onChange}
    />
  );
};

export default File;
