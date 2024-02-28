import React from "react";

const TwoTextColumn = ({ text1, text2, textColor1, textColor2 }: any) => {
  const columnStyles: any = {
    display: "flex",
    width: "100%",
    padding: "1rem",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: "1px solid #E6E6E6",
  };

  const textStyles1 = {
    color: textColor1,
    marginRight: "auto",
    marginBottom: "8px",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "32px" /* 160% */,
  };

  const textStyles = {
    color: textColor1,
    marginRight: "auto",
    fontSize: "20px",
    marginBottom: "8px",
    fontWeight: 300,
    lineHeight: "32px" /* 160% */,
  };

  return (
    <div style={columnStyles}>
      <p style={textStyles1}>{text1}</p>
      <p style={{ ...textStyles, color: textColor2 }}>{text2}</p>
    </div>
  );
};

export default TwoTextColumn;
