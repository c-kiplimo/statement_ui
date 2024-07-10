import React, { CSSProperties, ReactNode } from "react";
import styles from "./add.item.module.css";

type AddItemProps = {
  children: ReactNode;
  onClick?: () => void;
  buttonStyles?: CSSProperties; 
};

const AddItems = ({ children, onClick, buttonStyles }: AddItemProps) => {
  return (
    <div className={`${styles.container} bodyr`} onClick={onClick} style={buttonStyles}>
      {children}
    </div>
  );
};

export default AddItems;

type IconProps = {
  children: ReactNode;
};

AddItems.Icon = ({ children }: IconProps) => (
  <div>
    {children}
  </div>
);

type TextProps = {
  text: string;
};

AddItems.Text = ({ text }: TextProps) => (
  <div>
    {text}
  </div>
);
