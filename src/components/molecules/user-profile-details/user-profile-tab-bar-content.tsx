"use client";
import React, { CSSProperties } from "react";
import { useTokens } from "@/src/app/(context)/ColorContext";
import MTab from "@/src/components/atoms/tabs/m_tab";
import UserPersonalDetails from "./info-card/user_info";
import TwoFactorAuth from "./multi-factor-auth/multi-factor-auth";
import UserDocuments from "./documents/user_document";

const UserProfileTabContent = () => {
  const token = useTokens();
  const items: {
    title: string;
    content: React.JSX.Element;
    contentwidth?: string;
  }[] = [
    {
      title: "Info",
      content: <UserPersonalDetails borderColer={token.border.primary} />,
    },
    {
      title: "Physical Address",
      content: <UserPersonalDetails borderColer={token.border.primary} />,
    },
    {
      title: "Documents",
      content: <UserDocuments />,
      contentwidth: "100%",
    },
    {
      title: "Communication Channel",
      content: <UserPersonalDetails borderColer={token.border.primary} />,
    },
    { title: "Two-factor Authentication", content: <TwoFactorAuth /> },
  ];

  const userProfileTabContent: CSSProperties = {
    display: "flex",
    width: "1023px",
    padding: "24px 16px 40px 16px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "32px",
    background: token.default.white,
  };

  return (
    <div className="user-profile-tab-frame" style={userProfileTabContent}>
      <MTab items={items} colorToken={token} />
    </div>
  );
};

export default UserProfileTabContent;
