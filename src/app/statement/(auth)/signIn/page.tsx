/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";

import { LoginForm } from "../../../../features/onboarding/signin/signInHelper";

import { useTokens } from "@/src/app/(context)/ColorContext";
import OnboardingMainContent from "@/src/components/molecules/onboarding/content_area/onboarding_main_content";
import OnboardingSiderBar from "@/src/features/sidebar/OnboardingSideBar";
import OnboardingLayout from "@/src/features/onboarding/layout/onboarding.layout";

const SignIn = () => {
  const token = useTokens();

  return (
    <OnboardingLayout siderBar={

      <OnboardingSiderBar
        widthSize="var(--onboarding-left-side-bar-width-size)"
        title="Welcome to simba portal."
        decription="View recyclic statement, interm statement, loan statement, and query records related to KCB Bank account."
        textColor={token.default.white}
        mainColor={token.brand.secondary} />
    }
      content={
        <OnboardingMainContent
          bgColor={token.default.white}

          textColor={token.text.primary}

          content={<LoginForm />} />

      } />

  );
};

export default SignIn;
