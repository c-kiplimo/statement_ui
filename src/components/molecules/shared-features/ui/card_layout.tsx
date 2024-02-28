import Card from "@/src/components/atoms/navigation/card/reusable_card";
import React from "react";

const MyLayout = ({ children }: any) => {
  const containerStyles: any = {
    display: "flex",
    padding: "16px 24px",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    borderRadius: "8px",
    background: "var(--default-white, #FFF)",
    boxShadow: "0px 4px 16px 0px rgba(149, 154, 136, 0.25)",
  };

  return <Card style={containerStyles}>{children}</Card>;
};

export default MyLayout;
