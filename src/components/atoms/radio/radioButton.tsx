import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import styles from "./radioButton.module.css";
import { RadioProps } from "antd";

type RadioButtonProps = {
  id: string;
  name: string;
  value?: string;
  type?: string;
  label?: string;
  required?: boolean;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & RadioProps;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & RadioProps;

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked
}) => {
  const [radioChecked, setChecked] = useState(checked)

  function handleChange(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    setChecked(!radioChecked)
  }

  useEffect(() => {
    setChecked(checked)
  })
  const [radioChecked, setChecked] = useState(checked);

  function handleChange(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    setChecked(!radioChecked);
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
        defaultChecked={radioChecked}
        onClick={handleChange}
        defaultChecked={radioChecked}
        onClick={handleChange}
      />
    </div>
  );
};

export default RadioButton;
