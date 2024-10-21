import React, { ReactNode, MouseEvent } from "react";
import { Button, ButtonProps } from "antd";
import { ConfigProviderProps } from "antd/es/config-provider";

type SizeType = ConfigProviderProps["componentSize"];

type PrimaryButtonProps = ButtonProps & {
  size?: SizeType | "small" | "middle" | "large" | undefined;
  shape?: ButtonProps["shape"];
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  iconPosition?: "left" | "right" | undefined;
  customStyles?: React.CSSProperties;
  iconStyle?: CSSPerspective;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text" | undefined;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({size, shape,onClick, customStyles, icon, children, buttonType, htmlType, iconStyle, iconPosition }:PrimaryButtonProps) => {
  // const { size, customStyles, buttonType, htmlType, iconStyle, iconPosition } =
  //   props;

  return (
    <Button
      htmlType={htmlType}
      shape={shape || "default"}
      type={buttonType}
      size={size as SizeType}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...customStyles,
      }}
      onClick={onClick}
      aria-label={
        typeof children === "string" ? children : undefined
      }
    >
      {iconPosition === "left" && icon && (
        <span style={{ margin: 4, ...iconStyle }}>{icon}</span>
      )}

      {children}

      {iconPosition === "right" && icon && (
        <span style={{ margin: 4 }}>{icon}</span>
      )}
    </Button>
  );
};

export default PrimaryButton;
