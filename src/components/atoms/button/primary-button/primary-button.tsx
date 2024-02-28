import React, { ReactNode, MouseEvent } from "react";
import { Button, ButtonProps } from "antd";
import { ConfigProviderProps } from "antd/es/config-provider";

type SizeType = ConfigProviderProps["componentSize"];

type PrimaryButtonProps = ButtonProps & {
  size?: SizeType | "small" | "middle" | "large" | undefined;
  shape?: ButtonProps["shape"];
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  iconPosition?: "left" | "right";
  customStyles?: React.CSSProperties;
  iconStyle?: CSSPerspective;
  buttonType?: "primary" | "default" | "dashed" | "link" | "text" | undefined;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  const { size, customStyles, buttonType, htmlType, iconStyle, iconPosition } =
    props;

  return (
    <Button
      htmlType={htmlType}
      shape={props.shape || "default"}
      type={buttonType}
      size={size as SizeType}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...customStyles,
      }}
      onClick={props.onClick}
      aria-label={
        typeof props.children === "string" ? props.children : undefined
      }
    >
      {iconPosition === "left" && props.icon && (
        <span style={{ margin: 4, ...iconStyle }}>{props.icon}</span>
      )}

      {props.children}

      {iconPosition === "right" && props.icon && (
        <span style={{ margin: 4 }}>{props.icon}</span>
      )}
    </Button>
  );
};

export default PrimaryButton;
