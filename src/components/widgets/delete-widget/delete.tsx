import React, { CSSProperties, ReactNode } from 'react'
import styles from "./delete.module.css"

type DeleteProps = {
    children: ReactNode
    onClick: () => void
    textStyles?:CSSProperties;
    IconStyle?:CSSProperties;
}

const Delete = ({ children, onClick,textStyles,IconStyle }: DeleteProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {children}
    </div>
  )
}

export default Delete

type TextProps = {
    text: string;
    style?: CSSProperties;
}

Delete.text = ({ text }: TextProps) => (
    <div>{text}</div>
);

type IconProps = {
    children: ReactNode
    style?: CSSProperties;
}

Delete.Icon = ({ children }: IconProps) => (
    <div>{children}</div>
)
