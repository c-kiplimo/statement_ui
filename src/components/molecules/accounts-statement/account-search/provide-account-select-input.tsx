"use client";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import React from "react";
import { useState, useEffect, useRef } from "react";

const ProviderAccountSelectInput = ({ options, onSelect, icon }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const token = useTokens();
  const font = useFont();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const filteredOptions = options.filter((option: any) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleCheckboxChange = (option: any) => {
    if (option) {
      setSelectedValues(option);
    } else {
      setSelectedValues(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const AccountOptionSelect = () => {
    return (
      <div
        style={{ position: "absolute", zIndex: "1000" }}
        className="border border-t-1 border-[neutralColors300] w-full right-0 absolute  top-full mt-3  bg-[white] max-h-60 overflow-y-auto"
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 m-3 border border[grey] rounded focus:outline-none text-[grey] placeholder-[grey]"
          style={{
            color: "grey",
            backgroundColor: "#fff",
          }}
        />
        {filteredOptions.map((option: string) => (
          <div
            key={option}
            className="p-2 cursor-pointer hover:bg-[grey]"
            onClick={() => handleSelect(option)}
            style={{
              backgroundColor:
                selectedOption === option
                  ? token.background.secondary
                  : token.default.white,
              opacity: selectedOption === option ? "0.8" : "1",
            }}
          >
            <label
              className="flex justify-between p-1 items-center text-[grey]"
              style={{
                color: "grey",
                position: "relative",
              }}
            >
              {option}
              <input
                type="checkbox"
                checked={!selectedValues}
                onChange={() => handleCheckboxChange(option)}
              />
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="relative provider-account-select-input"
      ref={containerRef}
      style={{
        display: "flex",
        height: "40px",
        padding: "10px",
        alignItems: "center",
        gap: "8px",
        borderRadius: "8px",
        border: `0.5px solid ${token.border.primary}`,
        background: token.accent.success_invert_01,
      }}
    >
      <div
        className="select-input-text"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <input
            type="text"
            placeholder="Current Account KES 132314245"
            value={selectedValues}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none  text-[functional-colors-success] placeholder-lime-600"
            style={{
              backgroundColor: "#d1f6de",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "25.5px",
              color: token.accent.success,
            }}
          />
        </div>
        <div className="dropdown-icon">{icon}</div>
      </div>

      {isOpen && <AccountOptionSelect />}
    </div>
  );
};

export default ProviderAccountSelectInput;
