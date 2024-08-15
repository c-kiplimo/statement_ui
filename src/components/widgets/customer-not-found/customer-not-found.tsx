import React, { ReactNode } from "react";
import styles from "./customer-not-found.module.css";

type notFoundProps ={
    children:ReactNode;
}
const CustdetailsnotFound = ({children}:notFoundProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default CustdetailsnotFound;

type IconProps = {
    children: ReactNode;
  };

CustdetailsnotFound.Icon =({children}:IconProps)=>{
    return <div className={styles.icon}>{children}</div>;
}

type TextProps = {
    text:string;
  };

CustdetailsnotFound.Text =({text}:TextProps)=>{
    return <div className={`${styles.text} bodyr`}>{text}</div>;
}