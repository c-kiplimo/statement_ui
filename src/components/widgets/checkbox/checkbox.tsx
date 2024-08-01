import React, { useState, useEffect } from 'react';
import styles from "./checkbox.module.css";

type CheckboxProps = {
  text: string;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean; // Add this line
  onChange?: () => void;
};

const CheckboxComponent = ({ text, defaultChecked = false, checked: controlledChecked, disabled = false, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(controlledChecked ?? defaultChecked);

  useEffect(() => {
    if (controlledChecked !== undefined) {
      setChecked(controlledChecked);
    }
  }, [controlledChecked]);

  const toggleCheckbox = () => {
    if (disabled) return; 
    if (onChange) {
      onChange();
    } else {
      setChecked(!checked);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={toggleCheckbox}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled} 
    >
      <div className={`${styles.checkbox} ${checked ? styles.checked : ''} ${disabled ? styles.disabled : ''}`}>
        {checked && <div className={styles.checkmark}><img src="/tick.svg" alt="tick" /></div>}
      </div>
      <div className={`${styles.text} bodyr`}>{text}</div>
    </div>
  );
};

export default CheckboxComponent;
