import React from "react";

const FormBuilder = ({ onSubmit, children }: any) => {
  return (
    <form className="flex flex-col space-y-10" onSubmit={onSubmit}>
      <div className="w-90">{children}</div>
    </form>
  );
};

export default FormBuilder;
