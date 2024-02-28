'use client';

import React, { use } from 'react';
import ResetPasswordSubmissionHelper from './resetPasswordSubmissionHelper';
import { useTokens } from '@/src/app/(context)/ColorContext';

import Image from 'next/image';

import { usePathname } from 'next/navigation';
import OnboardingMainContent from '@/src/components/molecules/onboarding/content_area/onboarding_main_content';
import OnboardingSiderBar from '@/src/features/sidebar/OnboardingSideBar';
import TwoColumnLayout from '@/src/components/molecules/shared-features/layout/TwoColumnLayout';

const ResetPasswordSubmision = () => {
  const pathname = usePathname();
  const token = useTokens();

  const iSpathname = pathname === '/authentication/resetPasswordSubmission';

  const defaultContent = (
    <span style={{ color: iSpathname ? token.brand.primary : undefined }}>
      Reset Password
    </span>
  );

  return (
    <TwoColumnLayout>
      <OnboardingSiderBar
        widthSize="var(--onboarding-left-side-bar-width-size)"
        textColor={token.default.white}
        mainColor={token.brand.secondary}
        title={defaultContent}
        secondaryText={
          <Image src="/reset.svg" width={60} height={100} alt="img" />
        }
      />
      <OnboardingMainContent
        bgColor={token.default.white}
        textColor={token.text.primary}
        content={<ResetPasswordSubmissionHelper />}
      />
    </TwoColumnLayout>
  );
};

export default ResetPasswordSubmision;
