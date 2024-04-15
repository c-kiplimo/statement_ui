import { Checkbox } from "antd";
import React from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

const CheckboxComponent: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
}: CheckboxProps) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };
  return (
    <div>
      <Checkbox checked={checked} onChange={handleCheckboxChange} />
      <label>{label}</label>
    </div>
  );
};

export default CheckboxComponent;
