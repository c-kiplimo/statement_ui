import React, { ReactNode } from "react";
import styles from "./add.item.module.css";



type sortProps={
    title:string;
    icon:ReactNode;
}

const AddItem = (props:sortProps) => {
  return (
    <div className={styles.container}>
        <div className={styles.icondiv}>
        {props.icon}
      </div>
      <div className={styles.textdiv}>{props.title}</div>
      
    </div>
  );
};

export default AddItem;
