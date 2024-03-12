import React from "react";
import styles from "./radioButton.module.css";

type RadioButtonProps = {
  id: string;
  name: string;
  value?: string;
  type?: string;
  label?: string;
  required?: boolean;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <div className={styles.radioContainer}>
      <input
        className={styles.radioButton}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default RadioButton;
