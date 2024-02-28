import React, { ChangeEvent, CSSProperties, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./custom-search.css";

type SearchInputProps = {
  onSearch: (searchTerm: string) => void;
  borderColor?: string;
  color?: string;
  borderWidth?: string;
  iconHeight?: string;
};

const CustomSearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  borderColor = "#000",
  color = "#000",
  borderWidth = "1px",
  iconHeight = "16px",
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const inputStyles: CSSProperties = {
    border: `${borderWidth} solid ${borderColor}`,
    color: color,
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
        style={inputStyles}
      />
      <SearchOutlined className="search-icon" style={{ height: iconHeight }} />
    </div>
  );
};

export default CustomSearchInput;
