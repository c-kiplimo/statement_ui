"use client";

import React from "react";
import OtpVerifyHelper from "./otpVerifyHelper";
import { useRouter } from "next/navigation";
import { useTokens } from "@/src/app/(context)/ColorContext";
import OnboardingMainContent from "@/src/components/molecules/onboarding/content_area/onboarding_main_content";
import OnboardingSiderBar from "@/src/features/sidebar/OnboardingSideBar";
import TwoColumnLayout from "@/src/components/molecules/shared-features/layout/TwoColumnLayout";

type otpVerification = {
  openOtpDelivaryOptionHanlder: () => {};
};

const OtpVerification = () => {
  const token = useTokens();
  const router = useRouter();

  const onCLick = (data: any) => {
    console.log("data", data);

    router.push("/authentication/signIn");
  };
  return (
    <TwoColumnLayout>
      <OnboardingSiderBar
        widthSize="var(--onboarding-left-side-bar-width-size)"
        title="Verify your Account. "
        decription="Enter the otp to verify account"
        secondaryText="Iphoibe206@gmail.com is associated with an existing account, you will receive an email with instructions for reseting your password "
        textColor={token.default.white}
        mainColor={token.brand.secondary}
      />

      <OnboardingMainContent
        bgColor={token.default.white}
        textColor={token.text.primary}
        content={<OtpVerifyHelper onClick={onCLick} />}
      />
    </TwoColumnLayout>
  );
};

export default OtpVerification;
