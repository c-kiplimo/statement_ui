import React from "react";

const RoundedButton = ({ text, bgColor }: any) => {
  const buttonStyle = {
    backgroundColor: bgColor,
    borderRadius: "27px",
  };

  return (
    <div className="text-center">
      <button className="px-4 py-2 text-[#84BD00]" style={buttonStyle}>
        {text}
      </button>
    </div>
  );
};

export default RoundedButton;
