import React, {ChangeEvent, useState } from "react";
import styles from "./table-search-bar.module.css";
import {SearchOutlined } from "@ant-design/icons";
import Image from "next/image";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (terms: any) => {
    setSearchTerm(terms);
    console.log("search-terms", searchTerm);
  };

  const handleDelete = () => {
    console.log("Delete button clicked!");
  };

  const handleMoreOptions = () => {
    console.log("More Options button clicked!");
  };

  const handleRefresh = () => {
    console.log("Refresh button clicked!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <SearchInput onSearch={handleSearch}></SearchInput>
        <div className={styles.wrapper}>
          <div className={styles.options}>
            <ActionButton
              onClick={handleDelete}
              icon={
                <Image
                    src={"/delete.svg"}
                    alt="delete-icon"
                    width={16}
                    height={16}
                  />
              }
              text="Delete"
            />
            <ActionButton
              onClick={handleRefresh}
              icon={
                <Image
                  src={"/refreshIcon.svg"}
                  alt="refresh-icon"
                  width={16}
                  height={16}
                />
              }
              text="Refresh"
            />
          </div>
          <MoreOption
            onClick={handleMoreOptions}
            icon={
              <Image
                src={"/moreIcon.svg"}
                alt="view-more-icon"
                width={5}
                height={16}
              />
            }
            text={""}
          />
        </div>
      </div>
    </div>
  );
};

type SearchInputProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className={styles.searchContainer}>
      <SearchOutlined size={16} />
      <input
        className={`${styles.searchInput} bodym`}
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
      />
    </div>
  );
};

type ActionButtonProps = {
  onClick: () => void;
  icon: React.ReactElement;
  text: string;
};

const ActionButton = ({ onClick, icon, text }: ActionButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button type="button" className={styles.actionButton} onClick={handleClick}>
      {icon}
      {text && <span className="bodym">{text}</span>}
    </button>
  );
};

type MoreOptionProps = {
  onClick: () => void;
  icon: React.ReactElement;
  text: string;
};

const MoreOption = ({ onClick, icon, text }: MoreOptionProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button type="button" className={styles.moreOption} onClick={handleClick}>
      {icon}
      {text && <span className="bodym">{text}</span>}
    </button>
  );
};

export default SearchBar;
