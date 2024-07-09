import React, { ChangeEvent, ReactNode } from "react";
import styles from "./search-button.module.css";

type SearchProps = { 
  children:ReactNode;
};

const SearchButton = ({children}: SearchProps) => {

  return (
    <div className={styles.container}>
     {children}
    </div>
  );
};

export default SearchButton;

type IconProps = {
  children: ReactNode;
};

SearchButton.Icon = ({children }: IconProps) => {
  return <div className={styles.icon}>{children}</div>;
};

type InputProps = {
  text: string;
  onSearch: (searchTerm: string) => void;
};

SearchButton.Input = ({ text, onSearch }: InputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={`${styles.input} bodyr`}
        type="text"
        placeholder={text}
        onChange={handleInputChange}
      />
    </div>
  );
};
