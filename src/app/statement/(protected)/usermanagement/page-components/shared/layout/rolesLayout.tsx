import React from "react";
import { useTokens } from "@/src/app/(context)/ColorContext";

const RolesLayout = ({ children, text }: any) => {
  const token = useTokens();
  return (
    <div style={{ background: token.default.white }} className="w-full">
      {text}
      {children}
    </div>
  );
};

export default RolesLayout;
