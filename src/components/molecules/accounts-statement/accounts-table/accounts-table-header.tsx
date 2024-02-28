import React from "react";

const AccountStatementTableHeader = ({
  title,
  description,
  titleColor,
  descriptionColor,
  titleFontWeight,
  descriptionFontWeight,
}: any) => {
  const flexContainerStyles: any = {
    display: "flex",
    gap: "2rem",
    padding: "0.3rem",
  };

  const textStyle1 = {
    color: titleColor,
    fontWeight: titleFontWeight,
  };

  const textStyle2 = {
    color: descriptionColor,
    fontWeight: descriptionFontWeight,
  };

  return (
    <div style={flexContainerStyles}>
      <p style={textStyle1}>{title}</p>
      <p style={textStyle2}>{description}</p>
    </div>
  );
};

export default AccountStatementTableHeader;
