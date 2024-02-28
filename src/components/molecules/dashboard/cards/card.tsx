"use client";

import React from "react";
import { useTokens, useColors } from "@/src/app/(context)/ColorContext";
import AccountCardHeader from "../acounts/account-card-header";
import CardContent from "./card-content";
import RoundedButton from "../../shared-features/ui/rounded_button";
const Card = () => {
  const token = useTokens();
  const color = useColors();
  return (
    <div
      className="card"
      style={{
        display: "flex",
        width: "100%",
        minWidth: "526px",
        padding: "16px 24px",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        alignSelf: "stretch",
        borderRadius: "12px",
        border: `1px solid ${token.border.primary}`,
        background: token.default.white,
      }}
    >
      <AccountCardHeader
        text="Card"
        width="488px"
        searchIcon={<img src="/funnel.svg" />}
        addIcon={<img src="/plusIcon.svg" />}
      />

      <CardContent />
      <div className="card-footer">
        <RoundedButton
          textColor={token.brand.primary}
          text="View more"
          bgColor={color.neutralColors300}
        />
      </div>
    </div>
  );
};

export default Card;
