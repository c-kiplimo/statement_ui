import { Button } from "antd";
import React, {ReactNode } from "react";
import styles from "./table-button.module.css"

type BtnProps = { 
    children:ReactNode;
    
  };
  
  const TableButton = ({children}: BtnProps) => {
  
    return (
      <div className={styles.btn}>
       {children}
      </div>
    );
  };
  
  export default TableButton;

  type IconProps = {
    children: ReactNode;
  };
  
  TableButton.Icon = ({children }: IconProps) => {
    return <div>{children}</div>;
  };

type TextProps = {
  text: string;
};

TableButton.Text = ({text}:TextProps) => {
  return <div className="captionr">{text}</div>
};

