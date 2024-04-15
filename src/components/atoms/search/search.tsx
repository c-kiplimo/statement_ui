import React, { ChangeEvent } from "react";
import styles from "./search.module.css";

type SearchProps = {
  title: string;
  icon: React.ReactNode;
};

const Search = (props: SearchProps) => {
  return (
    <div className={styles.container}>
      <input type="text" placeholder={props.title} className={styles.input} />
      <div className={styles.icon}>{props.icon}</div>
    </div>
  );
};

export default Search;
