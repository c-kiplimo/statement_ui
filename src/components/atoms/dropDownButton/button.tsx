import React, { ReactNode } from 'react';
import styles from "./button.module.css";

interface DataTye {
    key:number,
    value:string;
    option:string
}

type onClickprop = {
    icon:ReactNode;
    icon1?:ReactNode;
    options:DataTye[];
    textColor:string;
    iconColor:string;
    bgColor:string;
    onClick?: () => void;
}



const Button = (props: onClickprop) => {
    return (
        <div className={styles.container} style={{ backgroundColor:props.bgColor}}>
            <div className={styles.selectContainer}>
                <div>{props.icon1}</div>
                <div className={styles.text} style={{color:props.textColor}}>
                <select className={styles.select} onClick={props.onClick}>
                    {props.options.map((option)=>(
                    <option className={styles.op1} value={option.value}>{option.option}</option>
                    ))}
                </select>
                </div>
                <div className={styles.icon} style={{ color:props.iconColor }}>{props.icon} </div>
            </div>
        </div>
    );
}

export default Button;
