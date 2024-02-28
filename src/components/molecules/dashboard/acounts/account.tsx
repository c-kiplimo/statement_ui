import React from "react";

import AcountContent from "./accounts-content";
import { useTokens, useColors } from "@/src/app/(context)/ColorContext";
import AccountCardHeader from "./account-card-header";
import RoundedButton from "../../shared-features/ui/rounded_button";

const Account = () => {
  const token = useTokens();
  const color = useColors();
  return (
    <div
      className="accounts"
      style={{
        borderRadius: "12px",
        border: `1px solid ${token.border.primary} `,
        background: token.default.white,
        display: "flex",
        width: "100%",
        minWidth: "526px",
        padding: "16px 24px 32px 24px",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        alignSelf: "stretch",
      }}
    >
      <AccountCardHeader
        text="Account"
        width="488px"
        searchIcon={<img src="/funnel.svg" />}
        addIcon={<img src="/plusIcon.svg" />}
      />

      <AcountContent />

      <div className="account-footer">
        <RoundedButton
          textColor={token.brand.primary}
          text="View more"
          bgColor={color.neutralColors300}
        />
      </div>
    </div>
  );
};

export default Account;
