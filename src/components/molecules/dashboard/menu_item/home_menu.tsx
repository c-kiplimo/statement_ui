"use client";

import React from "react";
import { useTokens } from "@/src/app/(context)/ColorContext";
import ViewStatementCard from "../../shared-features/ui/view-statement-card";

const HomeMenu = () => {
  const token = useTokens();
  return (
    <div
      className="home-menu"
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        alignItems: "flex-start",
        alignSelf: "stretch",
      }}
    >
      <ViewStatementCard
        width="251px"
        height="h-[auto 92px]"
        padding="p-[24px]"
        icon={<img src="/Account.png" />}
        title="Account Statement"
        description="View your account statement"
        textColor={{
          title: token.text.secondary,
          description: token.text.description_01,
        }}
      />

      <ViewStatementCard
        width="251px"
        height="h-[auto 92px]"
        padding="p-[24px]"
        icon={<img src="/product.png" />}
        title="Loan Statement"
        description="View your account statement"
        textColor={{
          title: token.text.secondary,
          description: token.text.description_01,
        }}
      />

      <ViewStatementCard
        width="251px"
        height="h-[auto 92px]"
        padding="p-[24px]"
        icon={<img src="/grup.png" />}
        title="Card Statement"
        description="View your account statement"
        textColor={{
          title: token.text.secondary,
          description: token.text.description_01,
        }}
      />

      <ViewStatementCard
        width="251px"
        height="h-[auto 92px]"
        padding="p-[24px]"
        icon={<img src="/bird.png" />}
        title="Swift Statement"
        description="View your account statement"
        textColor={{
          title: token.text.secondary,
          description: token.text.description_01,
        }}
      />
    </div>
  );
};

export default HomeMenu;
