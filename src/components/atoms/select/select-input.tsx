import React, { useState } from "react";

import { useTokens } from "@/src/app/(context)/ColorContext";

interface SelectInputProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, onSelect }) => {
  const token = useTokens();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowOptions(false);
    onSelect(option);
  };

  const selectInputStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: token.accent.success,
    padding: "8px",
    position: "relative",
    display: "inline-block",
    margin: "10px",
  };

  const optionsPopupStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    right: "0",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    padding: "10px",

    margin: "10px 0 0 0",
    width: "200px",
    zIndex: 1,
  };

  const pleaseSelectStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    borderBottom: `0.02px solid ${token.text.description_01}`,
    justifyContent: "space-between",
    marginBottom: "8px",
  };

  const optionItemStyle: React.CSSProperties = {
    width: "100px",
    padding: "8px",
    marginBottom: "16px",
    cursor: "pointer",
  };

  const buttonContentStyle: React.CSSProperties = {
    display: "flex",
    color: token.default.white,
    alignItems: "center",
  };

  return (
    <div style={selectInputStyle}>
      <button
        style={buttonContentStyle}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedOption ? selectedOption : "Download"}
        <span style={{ marginLeft: "4px", fontSize: "12px" }}>&#9662;</span>
      </button>
      {showOptions && (
        <div style={optionsPopupStyle}>
          <p style={pleaseSelectStyle}>
            Please select
            <span style={{ marginLeft: "4px", fontSize: "12px" }}>&#9662;</span>
          </p>
          {/* <hr /> */}
          <ul>
            {options.map((option) => (
              <li
                style={optionItemStyle}
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectInput;
