import React from 'react';
import { CSSProperties } from 'react';
import styles from "./tags.module.css"

type ButtonProps = {
  onClick?: (e: any) => void;
  buttonStyle?: CSSProperties;
  children: React.ReactNode;
};

const Tags = ({ onClick, buttonStyle, children }: ButtonProps) => {
  return (
    <button className={styles.container} onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
};

const ButtonIcon = ({ children }: { children: React.ReactNode }) => (
  <span>{children}</span>
);

const ButtonText = ({ title }: { title: string }) => (
  <span>{title}</span>
);

Tags.Icon = ButtonIcon;
Tags.Text = ButtonText;

export default Tags;
