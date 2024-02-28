import React from "react";
import "./input.css";

type InputProps = {
  borderColor: string;
  type?: string;
  placeholder?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: React.CSSProperties;
};

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  leftIcon,
  rightIcon,
}) => {
  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {leftIcon && <div className="icon left-icon">{leftIcon}</div>}
        {rightIcon && <div className="icon right-icon">{rightIcon}</div>}
      </div>
    </div>
  );
};

export default Input;
