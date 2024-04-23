import React from "react";

type inputProps = {
  id?: string;
  className: string;
  type: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
};

const InputComponent = ({
  className,
  type,
  value,
  onChange,
  placeholder,
  required,
}: inputProps) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default InputComponent;
