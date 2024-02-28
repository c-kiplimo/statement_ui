"use client";

import React from "react";

type CheckboxProps = {
  checked: boolean;
  bordercolor: string;
  defaultGrey: string;
  defaultWhite: string;
  checkIcon?: React.ReactNode;
  checkboxLabel: string;
  onChange: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  bordercolor,
  defaultGrey,
  defaultWhite,
  checkIcon,
  onChange,
  checkboxLabel,
}) => {
  const handleCheckboxChange = () => {
    onChange(!checked);
  };

  return (
    <label
      style={{
        display: "flex",
        flexShrink: 0,
        alignItems: "center",
        cursor: "pointer",
        whiteSpace: "nowrap", // Prevent text wrapping
        overflow: "hidden", // Hide overflow
        textOverflow: "ellipsis", // Display ellipsis (...) for long text
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        style={{ display: "none" }}
      />
      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "3px",
          border: `2px solid ${checked ? bordercolor : defaultGrey}`,
          color: checked ? bordercolor : defaultGrey,
          backgroundColor: checked ? defaultWhite : "transparent",
          display: "inline-block",
          marginRight: "8px",
        }}
      >
        {checked && checkIcon}
      </span>
      {checkboxLabel}
    </label>
  );
};

export default Checkbox;
