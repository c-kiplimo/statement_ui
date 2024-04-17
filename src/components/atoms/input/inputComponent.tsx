import React from "react";

type inputProps = {
  id: string;
  className: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const InputComponent = ({
  className,
  type,
  value,
  onChange,
  placeholder,
}: inputProps) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
