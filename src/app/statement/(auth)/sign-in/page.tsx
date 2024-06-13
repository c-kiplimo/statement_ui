"use client";

import React from "react";
import styles from "./sign-in-components/signInHelper.module.css";
import SignInHelper from "./sign-in-components/signInHelper";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import HavingTrouble from "@/src/components/widgets/having-trouble/having-trouble";

const SignIn = () => {
  return (
    <TwosidedLayout>
      <HavingTrouble />
      <SignInHelper />
    </TwosidedLayout>
  );
};

export default SignIn;
