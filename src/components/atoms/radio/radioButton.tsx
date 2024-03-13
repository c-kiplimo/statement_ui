import React, { useEffect, useState } from "react";
import styles from "./radioButton.module.css";
import { RadioProps } from "antd";

type RadioButtonProps = {
  id?: string;
  name?: string;
  value?: string;
  type?: string;
  label?: string;
  required?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & RadioProps;

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked = false,
  onChange
}) => {
  const [radioChecked, setChecked] = useState(checked);

  function handleClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    setChecked(e.currentTarget.checked);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.currentTarget.checked);
    onChange && onChange(e)
  }


  useEffect(() => {
    setChecked(checked);
  });

  return (
    <div className={styles.radioContainer}>
      <input
        className={styles.radioButton}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={radioChecked}
        onClick={handleClick}
        onChange={handleChange}
      />
    </div>
  );
};

export default RadioButton;
