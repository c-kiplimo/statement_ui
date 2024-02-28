'use client';

import React from 'react';
import ResetPasswordHelper from './resetHelper';
import { useColors, useTokens } from '@/src/app/(context)/ColorContext';
import OnboardingMainContent from '@/src/components/molecules/onboarding/content_area/onboarding_main_content';
import OnboardingSiderBar from '@/src/features/sidebar/OnboardingSideBar';
import TwoColumnLayout from '@/src/components/molecules/shared-features/layout/TwoColumnLayout';

const ResetPassword = () => {
  const color = useColors();
  const token = useTokens();
  return (
    <TwoColumnLayout>
      <OnboardingSiderBar
        widthSize="var(--onboarding-left-side-bar-width-size)"
        title="Recover your password. "
        decription="Check your e-mail for an activation link"
        secondaryText=""
        textColor={token.default.white}
        mainColor={token.brand.secondary}
      />

      <OnboardingMainContent
        bgColor={token.default.white}
        textColor={token.text.primary}
        content={<ResetPasswordHelper />}
      />
    </TwoColumnLayout>
  );
};

export default ResetPassword;
