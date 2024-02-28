"use client";

import React from "react";
import { useTokens } from "@/src/app/(context)/ColorContext";

const CustomerProfileLayout = ({ children, text }: any) => {
  const token = useTokens();
  return (
    <div
      style={{ background: token.default.white }}
      className="w-full having-trouble-text"
    >
      {text}

      {children}
    </div>
  );
};

export default CustomerProfileLayout;
