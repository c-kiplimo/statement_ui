import React from "react";

const TwoColumnLayout = ({ children }: any) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default TwoColumnLayout;
