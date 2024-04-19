"use client";

import React from "react";
import SignInHelper from "./sign-in-components/signInHelper";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";

const SignIn = () => {
  return (
    <div>
      <TwosidedLayout sidebar="" content={<SignInHelper />} />
    </div>
  );
};

export default SignIn;
