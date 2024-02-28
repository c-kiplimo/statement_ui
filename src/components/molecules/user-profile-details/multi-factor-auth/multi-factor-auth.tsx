import React, { CSSProperties, ReactNode, useState } from "react";
import CustomerProfileLayout from "../../shared-features/layout/customerProfileLayout";

import { Button, QRCode, Space, Steps } from "antd";
import OTPRegistrationTab from "@/src/components/atoms/tabs/otp_registration_tab";
import TwoFactorAuthenticateAccount from "./two-factor-authenticate-account";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";

export const userProfileData = [
  {
    title: "Delivery option",
    description: "Select delivery option",
  },
  {
    title: "Authorization code",
    description: "Confirm authorization code",
  },
];

type OTPOptionProps = {
  title: string;
  children: ReactNode;
};
const OTPOption = (props: OTPOptionProps) => (
  <div
    style={{
      display: "flex",
      gap: "16px",
      flexDirection: "column",
    }}
  >
    <div>
      <p className="otp-leading-title">{props.title}</p>
    </div>
    <div>
      <span
        className="otp-email-link-text"
        style={{ margin: "5px", paddingTop: "32px" }}
      >
        {props.children}
      </span>
    </div>
  </div>
);

const TwoFactorAuth = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const token = useTokens();
  const font = useFont();
  const defaultColor = token.text.secondary;

  const { primary, secondary } = token.brand;
  const { white, grey, black } = token.default;

  const handleStepClick = (step: any) => {
    setActiveStep(step);
  };

  const twoFactorAuthCss: CSSProperties = {
    display: "flex",
    width: "761px",
    height: "454px",
    padding: "24px 0px",
    alignItems: "flex-start",
    gap: "47px",
  };

  const customerProfileLayoutCss: CSSProperties = {
    display: "flex",
    width: "761px",
    height: "454px",
    padding: "24px 0px",
    alignItems: "flex-start",
    gap: "47px",
  };

  const data = [
    {
      title: "Phone Number",
      content: (
        <OTPOption
          title="You will get authentication SMS code on your mobile number"
          children="********16654"
        />
      ),
    },
    {
      title: "Email",
      content: (
        <OTPOption
          title="You will get authentication code on your email address"
          children="kelixyabby@gmail.com"
        />
      ),
    },
    {
      title: "Google Authenticator",
      content: (
        <OTPOption title="Scan QR code using an authenticator APP  and activate your two-factor authentication">
          <Space direction="vertical" align="center">
            <QRCode type="canvas" value="https://ant.design/" />
          </Space>
        </OTPOption>
      ),
    },
  ];

  return (
    <div className="two-factor-auth" style={twoFactorAuthCss}>
      <CustomerProfileLayout>
        <div style={customerProfileLayoutCss}>
          <Steps
            size="small"
            direction="vertical"
            current={activeStep}
            items={mapItemsToStepperOptions()}
            style={{ marginTop: "16px" }}
          />
          {activeStep === 0 && SetupStep()}

          {activeStep === 1 && (
            <TwoFactorAuthenticateAccount
              token={token}
              font={font}
              onOtpSubmit={() => {
                console.log("clicked");
              }}
              backClicked={back()}
              title="Authenticate Your Account"
              description="Protecting your account is our top priority please confirm
                your account by entering the authorization code you received"
            />
          )}
        </div>
      </CustomerProfileLayout>
    </div>
  );

  function back(): (event: React.MouseEvent<HTMLElement, MouseEvent>) => void {
    return (event) => {
      setActiveStep(activeStep - 1);
    };
  }

  function nextPage(): (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void {
    return (event) => {
      setActiveStep(activeStep + 1);
    };
  }

  function SetupStep(): React.ReactNode {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <div>
          <OTPRegistrationTab
            items={data}
            colorToken={token}
            fontProperties={font.typography.h6.regular}
            onClick={(event: React.MouseEvent<HTMLElement>, index: number) => {
              setActiveButtonIndex(index);
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            onClick={nextPage()}
            style={{
              color: white,
              backgroundColor: primary,
              height: "42px",
              cursor: "pointer",
            }}
          >
            Continue {data[activeButtonIndex].title}
          </Button>
        </div>
      </div>
    );
  }

  function mapItemsToStepperOptions() {
    return userProfileData?.map((step, index) => ({
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

export default TwoFactorAuth;
