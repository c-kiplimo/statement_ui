import React from "react";

const BorderLine = ({ color, thickness, style, children }: any) => {
  const borderClasses = `border-b  border-${color}   border-${thickness} ${
    style === "dashed"
      ? "border-dashed"
      : style === "solid"
      ? "border-solid"
      : ""
  }`;

  return <div className={borderClasses}>{children}</div>;
};

export default BorderLine;
