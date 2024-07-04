import React, { CSSProperties, ReactNode } from "react";
import styles from "./add.item.module.css";
import { type } from "os";

type AddItemProps = {
  children: ReactNode;
  onClick?: () => void;
};

const AddItems = ({children,onClick}: AddItemProps) => {
  return (
    <div className={`${styles.container} bodyr`} onClick={onClick}>{children}</div>
    );
};

export default AddItems;

type iconProps={
children:ReactNode
}

AddItems.Icon = ({children}:iconProps)=>(
  <div>
{children}
  </div>
)

type textProps={
  text:string
}
AddItems.text = ({text}:textProps)=>(
  <div>
{text}
  </div>
)