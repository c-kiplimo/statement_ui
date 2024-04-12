import React, { CSSProperties, ReactNode } from "react";
import styles from "./add.item.module.css";

type sortProps = {
  title: string;
  icon: ReactNode;
  iconStyle: CSSProperties;
  titleStyle: CSSProperties;
};

const AddItem = (props: sortProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.icondiv} style={props.iconStyle}>
        {props.icon}
      </div>
      <div className={styles.textdiv} style={props.titleStyle}>
        {props.title}
      </div>
    </div>
  );
};

export default AddItem;
