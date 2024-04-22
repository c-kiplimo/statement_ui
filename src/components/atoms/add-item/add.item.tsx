import React, { CSSProperties, ReactNode } from "react";
import styles from "./add.item.module.css";

type AddItemProps = {
  title: string;
  icon: ReactNode;
  iconStyle: CSSProperties;
  titleStyle: CSSProperties;
  onClick?: () => void;
};

const AddItem = (props: AddItemProps) => {
  return (
    <button className={styles.container} onClick={props.onClick}>
      <div className={styles.icondiv} style={props.iconStyle}>
        {props.icon}
      </div>
      <div className={styles.textdiv} style={props.titleStyle}>
        {props.title}
      </div>
    </button>
  );
};

export default AddItem;
