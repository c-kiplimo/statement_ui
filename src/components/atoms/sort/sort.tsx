import React, { ReactNode } from "react";
import styles from "./sort.module.css";



type sortProps={
    title:string;
    icon:ReactNode;
}

const Sort = (props:sortProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.textdiv}>{props.title}</div>
      <div className={styles.icondiv}>
        {props.icon}
      </div>
    </div>
  );
};

export default Sort;
