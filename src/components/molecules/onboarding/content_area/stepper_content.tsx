import React from "react";

const StepperContent = ({ children, marginTop }: any) => {
  return (
    <div style={{ marginTop: marginTop }} className="w-2/4 p-1">
      {children}
    </div>
  );
};

export default StepperContent;
