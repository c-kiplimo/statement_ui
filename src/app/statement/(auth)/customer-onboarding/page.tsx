'use client';

import React, { Fragment, useState } from 'react';
import { items, options } from '../data';
import { useTokens } from '@/src/app/(context)/ColorContext';
import TwoColumnLayout from '@/src/components/molecules/shared-features/layout/TwoColumnLayout';
import OnboardingSiderBar from '@/src/features/sidebar/OnboardingSideBar';
import CustomerProfileLayout from '@/src/components/molecules/shared-features/layout/customerProfileLayout';
import StepperOption from '@/src/components/molecules/onboarding/content_area/stepper_option';
import StepperContent from '@/src/components/molecules/onboarding/content_area/stepper_content';
import CustomerUserDetails from '@/src/components/molecules/onboarding/content_area/statement/customer_user_details';
import EnterOtpToVerify from '@/src/components/molecules/onboarding/content_area/statement/enter_otp_to_verify';
import OtpVerification from '@/src/components/molecules/onboarding/content_area/statement/otp_verification';

const CustomerProfilePage = () => {
  const token = useTokens();
  const [activeStep, setActiveStep] = useState(0);
  const [otpData, setOtpData] = useState('');

  console.log('otpData', otpData);

  const defaultColor = token.text.secondary;

  const handleStepClick = (step: any) => {
    setActiveStep(step);
  };

  const [modalData, setModalData] = useState({});

  console.log('modaldata>>>>', modalData);

  const handleModalClose = (data: any) => {
    console.log('Modal data received in parent:', data);
    setModalData(data);
  };

  const collectOtpData = (data: any) => {
    setOtpData(data);
    setActiveStep(activeStep + 1);
    console.log(' data received in parent:otp-data>>>', data);
  };

  const handleOtpData = (data: any) => {
    setActiveStep(activeStep + 1);

    console.log('Modal data received in parent:', data);
    setModalData(data);
  };

  const handleModalData = (data: any) => {
    if (data) {
      setActiveStep(activeStep + 1);
    }

    console.log('Data collected from modal form:', data);
    setModalData(data);
  };

  return (
    <Fragment>
      <TwoColumnLayout>
        <OnboardingSiderBar
          secondaryText={
            activeStep === 2
              ? 'Iphoibe206@gmail.com is associated with an existing account, you will receive an email with instructions for reseting your password '
              : ''
          }
          widthSize="474px"
          title={
            activeStep === 1
              ? 'Congratulations'
              : activeStep === 2
              ? 'Verify your Account.'
              : 'Just a few clicks away from accessing the simba portal.'
          }
          decription={
            activeStep === 2
              ? 'Enter the otp to verify account'
              : 'View recyclic statement, interm statement, loan statement, and query records related to KCB Bank account.'
          }
          textColor={token.default.white}
          mainColor={token.brand.secondary}
        />
        <CustomerProfileLayout
          text={
            <a href="#" className="absolute  top-4 right-12 ">
              Having trouble? <span className="get-help-link">Get help</span>
            </a>
          }
        >
          <div className="flex gap-17 m-9">
            <StepperOption
              items={mapItemsToStepperOptions()}
              current={activeStep}
              direction="vertical"
              padding="5rem"
              style={{ marginTop: '16px' }}
            />
            <StepperContent marginTop="6rem">
              {activeStep === 0 && (
                <CustomerUserDetails
                  onModalClose={handleModalClose}
                  onModalData={handleModalData}
                  options={options}
                />
              )}
              {activeStep === 1 && (
                <OtpVerification
                  openOtpDelivaryOptionHanlder={handleOtpData}
                  options={options}
                />
              )}
              {activeStep === 2 && (
                <EnterOtpToVerify onClick={collectOtpData} />
              )}
            </StepperContent>
          </div>
        </CustomerProfileLayout>
      </TwoColumnLayout>
    </Fragment>
  );

  function mapItemsToStepperOptions() {
    return items.map((step, index) => ({
      title: (
        <p
          className="stepper-title"
          style={{
            color: activeStep === index ? token.brand.secondary : defaultColor,
          }}
        >
          {step?.title}
        </p>
      ),
      description: (
        <p
          className="stepper-description "
          style={{
            color:
              activeStep === index
                ? token.brand.secondary
                : token.text.description_01,
          }}
        >
          {step?.description}
        </p>
      ),
      onClick: () => handleStepClick(index),
    }));
  }
};

export default CustomerProfilePage;
