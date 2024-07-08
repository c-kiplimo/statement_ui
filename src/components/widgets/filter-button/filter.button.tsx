import styles from './filter.button.module.css'
import { ReactNode } from "react";

type FilterButtonProps ={
    children:ReactNode;
    onClick:(e:any)=>void;
}
const FilterButton = ({onClick, children}:FilterButtonProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {children}
    </div>
  );
};
export default FilterButton;

type ButtonTextProps = {
  title:string;
}
FilterButton.Text = ({title}:ButtonTextProps)=>(
  <div>{title}</div>
)

type IconProps ={
  children:ReactNode;
}

FilterButton.Icon = ({children}:IconProps)=>(
  <div>{children} </div>
)

