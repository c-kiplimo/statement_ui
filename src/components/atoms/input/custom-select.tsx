"use client";

import React, { useState } from "react";

interface CustomSelectBoxProps {
  options: string[];
  defaultSelected?: string;
  onSelect?: (selected: string) => void;
  iconComponent?: React.ReactElement;
  iconColor?: string;
  borderColor?: string;
}

const CustomSelectBox: React.FC<CustomSelectBoxProps> = ({
  options,
  defaultSelected,
  onSelect,
  iconComponent = null,
  iconColor = "text-orange-300",
  borderColor = "bg-gray-100",
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    defaultSelected || options[0]
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`border ${borderColor} flex flex-col justify-center items-center w-fit relative z-10`}
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={`flex flex-row justify-between items-center bg-white w-48 my-2 p-2 rounded-lg cursor-pointer ${borderColor}`}
        >
          <span>{selectedOption}</span>
          {iconComponent && <div className={iconColor}>{iconComponent}</div>}
        </div>
        <div
          className={`flex flex-col bg-slate-300 w-48 my-2 rounded-lg ${
            open ? "opacity-100 h-auto" : "opacity-0 h-0"
          } transition-all duration-200 overflow-hidden absolute top-16 left-0`}
        >
          {options.map((item: string) => (
            <div
              key={item}
              onClick={() => {
                setSelectedOption(item);
                setOpen(false);
                onSelect && onSelect(item);
              }}
              className={`flex justify-start items-center gap-x-2 px-2 py-1 text-white hover:bg-lime-300 cursor-pointer ${
                selectedOption === item ? "bg-orange-100" : ""
              }`}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomSelectBox;
