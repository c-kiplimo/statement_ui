"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { RefreshCcwIcon } from "lucide-react";
import { useTokens } from "@/src/app/(context)/ColorContext";

const OnboardingMainContent = ({ bgColor, content }: any) => {
  const router = usePathname();
  const token = useTokens();

  const isSomeRoute = router === "/authentication/resetPassword";
  const linkClasses = isSomeRoute
    ? "absolute bottom-10 right-4"
    : "absolute top-4 right-4";

  const defaultContent = (
    <p className="p-[26px]">
      Having trouble? <span className="get-help-link">Get help</span>
    </p>
  );

  const alternateContent = (
    <p className="w-40 flex items-center">
      <RefreshCcwIcon />
      <span style={{ color: token.text.secondary, padding: "1rem" }}>
        Resend mail
      </span>
    </p>
  );

  return (
    <div
      className="having-trouble-text"
      style={{
        flex: 1,
        backgroundColor: bgColor,
        position: "relative",
      }}
    >
      <a href="#" className={linkClasses}>
        {isSomeRoute ? alternateContent : defaultContent}
      </a>
      <div
        style={{ width: "400px", marginLeft: "242px", marginTop: "-80px" }}
        className="flex flex-col items-center justify-center h-screen "
      >
        {content}
      </div>
    </div>
  );
};

export default OnboardingMainContent;
