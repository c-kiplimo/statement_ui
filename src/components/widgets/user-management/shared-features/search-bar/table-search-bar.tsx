"use client";
import "./table-search-bar.css";
import React, { CSSProperties, ChangeEvent, useState } from "react";
import {PrinterFilled, SearchOutlined } from "@ant-design/icons";
import { useTokens, useFont } from "@/src/app/(context)/ColorContext";
import Image from "next/image";

const SearchBar = () => {
  const token = useTokens();
  const font = useFont();

  const [searchTerm, setSearchTerm] = useState("");
  const tableSearchBarCss: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "298px",
    alignSelf: "stretch",
    background: token.default.white,
  };

  const handleSearch = (terms: any) => {
    setSearchTerm(terms);
    console.log("search-terms", searchTerm);
  };

  const handlePrint = () => {
    console.log("Print button clicked!");
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
    <div className="table-search-bar" style={tableSearchBarCss}>
      <SearchInput onSearch={handleSearch}></SearchInput>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "80px",
          flex: "1 0 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "40px",
          }}
        >
          <ActionButton
            onClick={handleDelete}
            icon={<Image src={"/delete.svg"} alt="delete-icon" width={16} height={16}/>}
            text="Delete"
            color={token.default.grey}
          />
          <ActionButton
            onClick={handleRefresh}
            icon={<Image src={"/refreshIcon.svg"} alt="refresh-icon" width={16} height={16}/>}
            text="Refresh"
            color={token.default.grey}
          />
          <ActionButton
            onClick={handlePrint}
            icon={<PrinterFilled />}
            text="Print"
            color={token.default.grey}
          />

          <ActionButton
            onClick={handleMoreOptions}
            icon={<Image src={"/moreIcon.svg"} alt="view-more-icon" width={5} height={16}/>}
            text={""}
            color={token.default.grey}
          />
        </div>
      </div>
    </div>
  );
};

type SearchInputProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <SearchOutlined className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
        className="search-input bodyr"
      />
    </div>
  );
};

type ActionButtonProps = {
  onClick: () => void;
  icon: React.ReactElement;
  text: string;
  color: string;
};

const ActionButton = (props: ActionButtonProps) => {
  const token = useTokens();
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const actionButtonCss: CSSProperties = {
    display: "flex",
    padding: "8px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    borderRadius: "4px",
    border: `0.5px solid ${token.default.grey}`,
    opacity: "0.8",
  };

  return (
    <button type="button" onClick={handleClick} style={actionButtonCss}>
      {props.icon}
      {props.text && <span className="action-text">{props.text}</span>}
    </button>
  );
};

export default SearchBar;
