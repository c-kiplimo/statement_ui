"use client";
import React from "react";
import TwoColumnLayout from "@/src/components/molecules/shared-features/layout/TwoColumnLayout";
import OnboardingSiderBar from "@/src/features/sidebar/OnboardingSideBar";
import SignUpHelper from "./signUpHelper";
import OnboardingMainContent from "@/src/components/molecules/onboarding/content_area/onboarding_main_content";

import { useTokens } from "@/src/app/(context)/ColorContext";

const SignUp = () => {
  const token = useTokens();
  return (
    <TwoColumnLayout dynamictext="Sign Up">
      <OnboardingSiderBar
        widthSize="var(--onboarding-left-side-bar-width-size)"
        title="Welcome to simba portal."
        decription="View recyclic statement, interm statement, loan statement, and query records related to KCB Bank account."
        textColor={token.default.white}
        mainColor={token.brand.secondary}
      />

      <OnboardingMainContent
        bgColor={token.default.white}
        textColor={token.text.primary}
        content={<SignUpHelper />}
      />
    </TwoColumnLayout>
  );
};

export default SignUp;
