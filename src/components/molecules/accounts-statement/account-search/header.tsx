import React from "react";
import { useTokens, useFont } from "@/src/app/(context)/ColorContext";

const AccountSearchHeader = () => {
  const token = useTokens();
  const font = useFont();
  return (
    <div
      className="account-search-header"
      style={{
        display: "flex",
        width: "100%",

        padding: "24px 0px 24px 32px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
        borderBottom: `1px solid ${token.border.primary}`,
      }}
    >
      <div
        style={{
          ...font.typography.h6.bold,
          color: token.text.secondary,
        }}
      >
        Meraki Systems - Accounts
      </div>
      <div
        style={{
          ...font.typography.h6.light,
          color: token.text.secondary,
        }}
      >
        Check and configure all accounts to be accessed by Simba Portal
      </div>
    </div>
  );
};

export default AccountSearchHeader;
