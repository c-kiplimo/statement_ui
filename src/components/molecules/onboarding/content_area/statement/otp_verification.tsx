"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import { useTokens } from "@/src/app/(context)/ColorContext";
import CompoundIndividualBusinessBtn from "@/src/components/atoms/navigation/compound-individual-business-btn";
import IconButton from "@/src/components/atoms/navigation/CustomerOnboardingButton";
import { useActiveStep } from "@/src/app/(context)/ActiveStepContext";
import { onBoardingHandler } from "@/src/services/auth/onboarding.service";
import { ONBOARDING_OTP_REQUEST_URL } from "../../../../../constants/environment";

const OtpVerification = ({ props, openOtpDelivaryOptionHanlder }: any) => {
  const { activeStep, setActiveStep } = useActiveStep();
  const [selectedValue, setSelectedValue] = useState({});
  const [notificationType, setNotificationType] = useState("EMAIL");
  const token = useTokens();
  const { onBoardingOtpService } = onBoardingHandler();

  const handleButtonClick = async (value: any) => {
    setSelectedValue(value);
    openOtpDelivaryOptionHanlder(value);
    const URL = `${ONBOARDING_OTP_REQUEST_URL}${notificationType}/${value.emailNumber}`;
    console.log("value>>", value.emailNumber);
    
    try {
      const result = await onBoardingOtpService(URL);
      alert("Button clicked");
      // Process the result if needed
    } catch (error) {
      // Handle the error
      console.error("Error during OTP request:", error);
      // Show an appropriate error message to the user
    }
  };

  return (
    <>
      <CompoundIndividualBusinessBtn
        text={
          activeStep === 0
            ? "What Type of user are you?"
            : "Congratulations your profile was found"
        }
      >
        <h6 style={{ color: token.text.secondary }}>
          Where would you want to receive notification?
        </h6>
        <Fragment>
          <IconButton
            onClick={() =>
              handleButtonClick({
                mobile: "mobile",
                mobileNumber: "254****567",
              })
            }
            width="360px"
            href="/authentication/customer"
            ButtonStyles={ButtonStyles}
            primaryColor={token?.brand?.primary}
            secondaryColor={token?.text?.description_01}
            descriptionColor={token?.text?.description_02}
            borderSecondaryColor={token?.border?.primary}
            defaultWhitColor={token?.default?.white}
            iconColor={token?.brand.primary}
            textColor={token?.text?.secondary}
            leftIcon={
              <Image
                src="/user_icon.svg"
                alt="Individual Icon"
                width="40"
                height="40"
              />
            }
            buttonText={
              activeStep && activeStep === 0
                ? "Customer Number "
                : "Mobile Number 254****567"
            }
            buttonDescription={
              activeStep && activeStep === 0
                ? "View statements "
                : "Configured mobile Number"
            }
          />

          <IconButton
            onClick={() =>
              handleButtonClick({
                email: "EMAIL",
                emailNumber: "ckiplimo54@gmail.com",
              })
            }
            width="360px"
            href="/authentication/customer"
            ButtonStyles={ButtonStyles}
            primaryColor={token.brand.primary}
            secondaryColor={token.text.description_01}
            descriptionColor={token.text.description_02}
            borderSecondaryColor={token?.brand?.primary}
            defaultWhitColor={token?.background?.primary}
            iconColor={token.brand.primary}
            textColor={token.text.secondary}
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
            buttonText={
              activeStep === 0
                ? "Account Number"
                : "Email Number  abb****.co.ke"
            }
            buttonDescription={
              activeStep == 0
                ? "Manage coporate users"
                : "Configured email number"
            }
          />
        </Fragment>
      </CompoundIndividualBusinessBtn>
    </>
  );
};

const ButtonStyles = {};

export default OtpVerification;
