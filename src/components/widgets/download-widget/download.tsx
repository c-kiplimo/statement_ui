import React, { CSSProperties, ReactNode } from 'react';
import styles from "./download.module.css";

type DownloadProps = {
  children: ReactNode;
  onClick?: () => void;
  textStyle?: CSSProperties;
  iconStyles?: CSSProperties;
};

const DownloadWidget = ({ children, onClick, textStyle, iconStyles }: DownloadProps) => {
  return (
    <div className={`${styles.container} bodyr`} onClick={onClick}>
      {children}
    </div>
  );
};

export default DownloadWidget;

type IconProps = {
  children: ReactNode;
  iconStyles?: CSSProperties;
};

DownloadWidget.Icon = ({ children, iconStyles }: IconProps) => (
  <div style={iconStyles}>{children}</div>
);

type TextProps = {
  text: string;
};

DownloadWidget.Text = ({ text }: TextProps) => (
  <div>{text}</div>
);
