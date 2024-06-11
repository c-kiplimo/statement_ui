import React from "react";
import styles from "./search.module.css";

type SearchProps = {
  title: string;
  icon: React.ReactNode;
};

const Search = (props: SearchProps) => {
  return (
    <div className={styles.inputWrapper}>
      {props.icon}
      <input
        placeholder={props.title}
        className={styles.input}
      />
      
    </div>
  );
};

export default Search;
