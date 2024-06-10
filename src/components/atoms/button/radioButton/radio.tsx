import React from 'react';
import styles from './radioButton.module.css';
import { Label } from '../../label/label';

type RadioButtonProps = {
  id: string;
  name: string;
  value?: string;
  type?: string;
  label?: string;
  required?: boolean;
  checked?: boolean;

  onChange: (checked: boolean) => void;
  additionalProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  type = 'radio',
  name,
  value,
  label,
  checked,
  required,
  onChange,
  ...additionalProps
}) => {
  return (
    <div className={styles.radioButton}>
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={() => onChange(!checked)}
        {...additionalProps}
      />
      <Label htmlFor={id} label={label!}/>
    </div>
  );
};

export default RadioButton;
