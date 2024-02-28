import React from "react";
import { useTokens, useFont } from "@/src/app/(context)/ColorContext";

const ViewStatementCard = ({
  width,
  height,
  padding,
  icon,
  title,
  description,
  textColor,
}: any) => {
  const token = useTokens();
  const font = useFont();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minWidth: width,
        padding: "24px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
        borderRadius: "8px",
        border: `1px solid  ${token.border.primary}`,
        background: token.default.white,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div>{icon}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <p
            style={{
              color: token.text.primary,
              fontSize: font.typography.body.regular.fontSize,
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            {title}
          </p>
          <p
            style={{
              color: token.text.description_01,
              fontSize: font.typography.caption.regular.fontSize,
              fontStyle: "normal",
              fontWeight: font.typography.caption.regular.fontWeight,
              lineHeight: font.typography.caption.regular.lineHeight,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewStatementCard;
