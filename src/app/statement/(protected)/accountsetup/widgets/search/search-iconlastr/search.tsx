import React from "react";
import styles from "./search.module.css";

type SearchProps = {
  title: string;
  icon: React.ReactNode;
};

const Search = (props: SearchProps) => {
  return (
    <div className={styles.inputWrapper}>
      
      <input
        placeholder={props.title}
        className={styles.input}
      />
      {props.icon}
    </div>
  );
};

export default Search;
