import React, { useState } from "react";
import {
  OnboardingProvider,
} from "../../context/onBoardingContext";
import { Steps } from "antd";
import SearchDetails from "../search-details/search-details";
import VerifyIdentity from "../verifyIdentity/verify-identity";

const { Step } = Steps;

export const ProfileOnboardIng = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleSearchSuccess = () => {
    setActiveStep(activeStep + 1);
  };

  const steps= [
    {
      title: "Search Details",
      description: "Search Customer Details",
      content: <SearchDetails onSuccess={handleSearchSuccess} />,
    },
    {
      title: "Verify Details",
      description: "Select Option",
      content: <VerifyIdentity/>,
    },
  ];

  return (
      <OnboardingProvider>
      <Steps current={activeStep} direction="horizontal" >
        {steps.map((step, index) => (
          <Step key={index} title={step.title} description={step.description} />
        ))}
      </Steps>
        <div>{steps[activeStep].content}</div>
      </OnboardingProvider>
  );
};
