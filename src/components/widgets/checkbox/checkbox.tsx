import React, { useState } from 'react';
import styles from "./checkbox.module.css";

type CheckboxProps = {
  text: string;
  defaultChecked?: boolean;
};

const CheckboxComponent = ({ text, defaultChecked = false }: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <div className={styles.container} onClick={toggleCheckbox} role="checkbox" aria-checked={checked}>
      <div className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
        {checked && <div className={styles.checkmark}><img src="/tick.svg" alt="tick" /></div>}
      </div>
      <div className={`${styles.text} bodyr`}>{text}</div>
    </div>
  );
};

export default CheckboxComponent;
