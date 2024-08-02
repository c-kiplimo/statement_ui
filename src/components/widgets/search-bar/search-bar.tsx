import React, { ChangeEvent, ReactNode } from "react";
import styles from "./search-bar.module.css";
import Texter from "../../atoms/text/texter";

type SearchProps = {
  children: ReactNode;
};

const SearchBar = ({ children }: SearchProps) => {
  return <div className={styles.searchBar}>{children}</div>;
};

type InputProps = {
  value: string;
  placeholder: string;
  onSearch: (searchTerm: string) => void;
};
SearchBar.Input = ({ value, onSearch, placeholder }: InputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };
  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={styles.searchBarInput}
    />
  );
};

type ButtonProps = {
  onClick: () => void;
  text: string;
  children: ReactNode;
};

SearchBar.Button = ({ onClick, text, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${styles.searchBtn} captionr`}>
      <Texter text={text} className={`${styles.text} captionr`}/>
      <span className={styles.plusIcon}>{children}</span>
    </button>
  );
};

export default SearchBar;
