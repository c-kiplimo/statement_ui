"use client";

import React from "react";
import NewPasswordHelper from "./newPasswordHelper";

import { useTokens } from "@/src/app/(context)/ColorContext";
import OnboardingMainContent from "@/src/components/molecules/onboarding/content_area/onboarding_main_content";
import OnboardingSiderBar from "@/src/features/sidebar/OnboardingSideBar";
import TwoColumnLayout from "@/src/components/molecules/shared-features/layout/TwoColumnLayout";

const CreateNewPassword = () => {
  const token = useTokens();
  return (
    <TwoColumnLayout>
      <OnboardingSiderBar
        widthSize="var(--onboarding-left-side-bar-width-size)"
        textColor={token.default.white}
        mainColor={token.brand.secondary}
        title="Create new password."
      />

      <OnboardingMainContent
        content={<NewPasswordHelper />}
        bgColor={token.default.white}
        textColor={token.text.primary}
      />
    </TwoColumnLayout>
  );
};

export default CreateNewPassword;
