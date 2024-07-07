import styles from './button.module.css'
import { CSSProperties, ReactNode } from "react";

type FilterButtonProps ={
    children:ReactNode;
    onClick:(e:any)=>void;
    buttonStyle?:CSSProperties;
}
const Button = ({onClick, children, buttonStyle}:FilterButtonProps) => {
  return (
    <div className={styles.container} onClick={onClick} style={buttonStyle}>
      {children}
    </div>
  );
};
export default Button;

type ButtonTextProps = {
  title:string;
}
Button.Text = ({title}:ButtonTextProps)=>(
  <div>{title}</div>
)

type IconProps ={
  children:ReactNode;
}

Button.Icon = ({children}:IconProps)=>(
  <div>{children} </div>
)

