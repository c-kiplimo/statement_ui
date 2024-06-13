import React, { ReactNode } from "react";
import styles from "./button.module.css";

interface DataType {
  key: number;
  value: string;
  option: string;
}

type onClickprop = {
  icon: ReactNode;
  icon1?: ReactNode;
  options: DataType[];
  textColor: string;
  iconColor: string;
  bgColor: string;
  defaultValue:string;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
};

const Buttonitem = (props: onClickprop) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: props.bgColor }}
    >
      <div className={styles.selectContainer}>
        <div>{props.icon1}</div>
        <div className={styles.text} style={{ color: props.textColor }}>
          <select
            className={styles.select}
            onClick={props.onClick}
            onChange={props.onChange}
          >
            {props.options.map((option) => (
              <option key={option.key} className={styles.op1} value={option.value} defaultValue={props.defaultValue}> 
                {option.option}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.icon} style={{ color: props.iconColor }}>
          {props.icon}
        </div>
      </div>
    </div>
  );
};

export default Buttonitem;
