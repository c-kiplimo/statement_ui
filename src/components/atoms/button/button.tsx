"use client";

import React, { ButtonHTMLAttributes, CSSProperties } from "react";

type PositionType = "static" | "relative" | "absolute" | "sticky" | "fixed";

type ButtonProps = {
  label?: string;
  bgColor?: string;
  borderRadius?: string;
  opacity?: string;
  width?: string;
  height?: string;
  position?: PositionType;
  top?: string;
  right?: string;
  borderColor?: string;
  icon?: React.ReactElement;
  textColor?: string;
  disabled?: boolean;
  style:CSSProperties;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  label,
  bgColor,
  height,
  position,
  borderRadius = "4px",
  opacity,
  top,
  right,
  borderColor = "#ECECED",
  icon,
  textColor,
  disabled = false,
  style,
  onClick,
  ...rest
}) => {
  return (
    <button
      style={{
        ...style,
        height: height,
        position: position,
        top: top,
        right: right,
        opacity: opacity,
        background: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        padding: "8px",
        borderRadius: "4px",
        display: "flex", // Use flexbox
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
      }}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {label && !icon && <span style={{ marginLeft: "8px" }}>{label}</span>}
    </button>
  );
};

export default Button;
