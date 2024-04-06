import React, { CSSProperties } from "react";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./custom.search.module.css";

type SearchInputProps = {
  placeholder?: string;
  inputStle: CSSProperties;
  iconStyles: CSSProperties;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
};

const CustomSearchInput = (props: SearchInputProps) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
        style={props.inputStle}
      />
      <SearchOutlined style={props.iconStyles} onClick={props.onClick} />
    </div>
  );
};

export default CustomSearchInput;
