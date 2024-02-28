import React from "react";
import FormBuilder from "../../shared-features/form_builder";
import { Button } from "antd";

import Link from "next/link";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";

import { AppColorToken, FontType } from "@/src/types/context.types";
import ConfirmationMethodButton from "./confirm-two-factor-button";

type TwoFactorAuthStepperContentProps = {
  buttons: { buttonText: string; isActive: boolean; onClick: () => void }[];
  title: string;
  QRcode: React.ReactElement;
  color: AppColorToken;
  font: FontType;
  description: string;
  activeButtonIndex: number;
  handleButtonClick: (step: number) => void;
  setActiveStep: (updateStep: (prevStep: number) => number) => void;
};

const TwoFactorAuthStepperContent = (
  props: TwoFactorAuthStepperContentProps
) => {
  const font = useFont();
  const token = useTokens();
  return (
    <FormBuilder>
      <h1
        style={{
          color: props.color.text.primary,
          ...props.font.typography.h6?.medium,
        }}
        className="otp-title-text mb-6 text-left"
      >
        {props.title}
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        {props.buttons.map((button, index) => (
          <ConfirmationMethodButton
            key={index}
            {...button}
            font={font}
            textColor={
              props.activeButtonIndex === index
                ? token.text.secondary
                : token.text.primary
            }
            height="87px"
            width="139px"
            borderSecondaryColor={
              props.activeButtonIndex === index
                ? props?.color.brand.primary
                : props.color.border.primary
            }
            backgroundColor={
              props.activeButtonIndex === index
                ? props.color.default.white
                : props.color.background.secondary
            }
            isActive={props.activeButtonIndex === index}
            onClick={() => props.handleButtonClick(index)}
            buttonText={"button.buttonText"}
          />
        ))}
      </div>

      <p className="otp-leading-text-description my-8 text-left">
        {props.activeButtonIndex === 0
          ? "You will get authentication SMS code to your mobile number"
          : props.activeButtonIndex === 1
          ? "You will get authentication code to your email address"
          : "Get Google authenticator to scan QR code and activate your two-factor authentication"}
        <span className="otp-email-link-text" style={{ margin: "5px" }}>
          <Link href="#">
            {props.activeButtonIndex === 0
              ? "********16654"
              : props.activeButtonIndex === 1
              ? "kelixyabby@gmail.com"
              : ""}
          </Link>
        </span>
      </p>

      <div className="flex gap-20">
        <Link href="#">
          <Button
            onClick={() => props.setActiveStep((prevStep) => prevStep - 1)}
            style={{
              padding: "0",
              color: props.color.default.black,
            }}
            type="link"
          >
            Back
          </Button>
        </Link>

        <Link style={{ width: "100%" }} href="#">
          <Button
            onClick={() => props.setActiveStep((prevStep) => prevStep + 1)}
            style={{
              width: "100%",
              color: props.color.default.white,
              backgroundColor: props.color.brand.primary,
              height: "42px",
              cursor: "pointer",
            }}
          >
            Continue
          </Button>
        </Link>
      </div>
    </FormBuilder>
  );
};

export default TwoFactorAuthStepperContent;
