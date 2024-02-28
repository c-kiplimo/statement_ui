import React, { useState } from "react";

const FlexContainerWithCardAndCheckbox = ({ avatar, text1, text2 }: any) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div
      className={`flex items-center m-5 border border-gray-300 p-4 rounded-lg ${
        checked ? "border-green-500" : ""
      }`}
    >
      <div className="flex items-center flex-1">
        <div className="w-14 h-10 rounded-sm bg-white border border-gray-300">
          {avatar}
        </div>
        <div className="ml-4">
          <div className="text-lg font-normal">{text1}</div>
          <div className="text-sm text-gray-600">{text2}</div>
        </div>
      </div>
      <div
        className={`flex items-center justify-center w-4 h-4 border-2 rounded-full cursor-pointer ${
          checked
            ? "bg-green-500 border-green-500"
            : "bg-transparent border-gray-400"
        }`}
        onClick={handleCheckboxChange}
      >
        {checked && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
      </div>
    </div>
  );
};

export default FlexContainerWithCardAndCheckbox;
