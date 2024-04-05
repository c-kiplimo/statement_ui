import { ReactNode } from "react";
import styles from "./search.module.css";

type searchProps={
  title:string;
  icon:ReactNode
}

const Search = (props:searchProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.textdiv}>{props.title}</div>
      <div className={styles.icon}>
        {props.icon}
      </div>
    </div>
  );
};

export default Search;
