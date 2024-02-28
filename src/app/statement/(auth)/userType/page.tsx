'use client';
import React, { Fragment } from 'react';
import CompoundIndividualBusinessBtn from '@/src/components/atoms/navigation/compound-individual-business-btn';
import TwoColumnLayout from '@/src/components/molecules/shared-features/layout/TwoColumnLayout';
import OnboardingSiderBar from '@/src/features/sidebar/OnboardingSideBar';
import OnboardingMainContent from '@/src/components/molecules/onboarding/content_area/onboarding_main_content';

import CustomerOnboardingButton from '@/src/components/atoms/navigation/CustomerOnboardingButton';
import { useColors, useTokens } from '@/src/app/(context)/ColorContext';
import Image from 'next/image';

const UserType = () => {
  const color = useColors();
  const token = useTokens();

  return (
    <TwoColumnLayout>
      <OnboardingSiderBar
        widthSize="560px"
        title="Just a few clicks away from accessing the simba portal."
        decription="View recyclic statement, interm statement, loan statement, and query records related to KCB Bank account."
        textColor={token.default.white}
        mainColor={token.brand.secondary}
      />
      <OnboardingMainContent
        mainColor={token.default.white}
        content={
          <CompoundIndividualBusinessBtn text="What Type of user are you?">
            <Fragment>
              <CustomerOnboardingButton
                width="360px"
                href="/authentication/customer"
                ButtonStyles={ButtonStyles}
                primaryColor={token?.brand?.primary}
                secondaryColor={token?.text?.description_01}
                descriptionColor={token?.text?.description_02}
                borderSecondaryColor={token?.border?.primary}
                defaultWhitColor={token?.default?.white}
                iconColor={color?.primary}
                textColor={token?.text?.secondary}
                leftIcon={
                  <Image
                    src="/user_icon.svg"
                    alt="Individual Icon"
                    width="40"
                    height="40"
                  />
                }
                buttonText="Customer Number"
                buttonDescription="View statements"
              />
              <CustomerOnboardingButton
                width="360px"
                href="/authentication/customer"
                ButtonStyles={ButtonStyles}
                primaryColor={token.brand.primary}
                secondaryColor={token.text.description_01}
                descriptionColor={token.text.description_02}
                borderSecondaryColor={token?.border?.primary}
                defaultWhitColor={token.default.white}
                iconColor={color.primary}
                textColor={color.shadeColorsShade100}
                leftIcon={
                  <Image
                    src="/user_icon.png"
                    alt="Business Icon"
                    width="40"
                    height="40"
                  />
                }
                rightIcon={
                  <Image
                    src="/Vector.svg"
                    alt="individual Icon"
                    width={14}
                    height={14}
                  />
                }
                buttonText="Account Number"
                buttonDescription="Manage coporate users"
              />
            </Fragment>
          </CompoundIndividualBusinessBtn>
        }
      />
    </TwoColumnLayout>
  );
};

const ButtonStyles = {};

export default UserType;
