import React, { ReactNode, CSSProperties } from 'react';
import styles from "./successful.module.css";

type successProps = {
    children: ReactNode;
    style?: CSSProperties;
}

const Successful = ({ children, style }: successProps) => {
    return (
        <div className={styles.container} style={style}>
            {children}
        </div>
    );
}

export default Successful;

type IconProps = {
    children: ReactNode;
    style?: CSSProperties;
}

Successful.Icon = ({ children, style }: IconProps) => (
    <div className={styles.icon} style={style}>{children}</div>
);

type textProps = {
    text: string;
    style?: CSSProperties;
}

Successful.Text = ({ text, style }: textProps) => (
    <div className={`${styles.text} bodyr`} style={style}>{text}</div>
);
