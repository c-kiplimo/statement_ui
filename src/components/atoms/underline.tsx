import React, { CSSProperties } from "react";

interface UnderlineProps {
  customStyles?: CSSProperties;
}

const Underline: React.FC<UnderlineProps> = ({ customStyles }) => {
  const defaultStyles: CSSProperties = {
    borderBottom: "1px solid var(--Border-Border-Primary, #E6E6E6)",
    width: "100%",
    marginTop: "24px",
  };

  const mergedStyles: CSSProperties = { ...defaultStyles, ...customStyles };

  return <div style={mergedStyles}></div>;
};

export default Underline;
