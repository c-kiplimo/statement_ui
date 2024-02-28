import React, { useState } from "react";
import { useTokens, useFont } from "@/src/app/(context)/ColorContext";

const defaultAvatar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
  >
    <circle cx="8.5" cy="8" r="7.5" stroke="#6F7269" />
  </svg>
);

const SelectionCard = ({
  avatar = defaultAvatar,
  title,
  description,
  avatarBgColor,
  avatarTextColor,
  borderColor = useTokens().border.primary,
}: any) => {
  const [checked, setChecked] = useState(false);
  const token = useTokens();
  const font = useFont();

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const generateAvatar = () => {
    if (title) {
      return <div>{title.charAt(0).toUpperCase()}</div>;
    }
    return null;
  };

  return (
    <div
      className="selection-card"
      style={{
        display: "flex",
        width: "100%",
        minWidth: "250px",
        padding: "16px 24px",
        justifyContent: "space-between",
        borderRadius: "8px",
        border: `1px solid ${borderColor}`,
        alignItems: "center",
        alignSelf: "stretch",
      }}
    >
      <div
        className="selection-card-info"
        style={{ display: "flex", alignItems: "center", gap: "12px" }}
      >
        <div
          style={{
            color: avatarTextColor,
            backgroundColor: avatarBgColor,

            display: "flex",
            width: "32px",
            height: "32px",
            padding: "8px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "50%",
          }}
        >
          {generateAvatar()}
        </div>
        <div
          className="sc-text-block"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <div
            style={{
              color: token.text.secondary,
              fontWeight: font.typography.body.medium.fontWeight,
              fontSize: font.typography.body.medium.fontSize,
              lineHeight: font.typography.body.medium.lineHeight,
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: token.text.secondary,
              fontWeight: font.typography.caption.regular.fontWeight,
              fontSize: font.typography.caption.regular.fontSize,
              lineHeight: font.typography.caption.regular.lineHeight,
            }}
          >
            {description}
          </div>
        </div>
      </div>

      <div
        className="selection-card-icon"
        onClick={handleCheckboxChange}
        style={{ width: "16px", height: "16px" }}
      >
        {avatar}
      </div>
    </div>
  );
};

export default SelectionCard;
