"use client";

import React from "react";
import SignUp from "./create-account-components/create-account";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";

const CreateAccount = () => {
  return (
    <div>
      <TwosidedLayout sidebar="" content={<SignUp />} />
    </div>
  );
};

export default CreateAccount;
