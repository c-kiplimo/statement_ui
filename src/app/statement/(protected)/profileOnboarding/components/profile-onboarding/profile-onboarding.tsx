import React, { useState } from "react";
import {
  OnboardingProvider,
} from "../../context/onBoardingContext";
import Stepper, {
  StepperContentProps,
} from "@/src/components/atoms/navigation/stepper/stepper";
import SearchDetails from "../search-details/search-details";
import VerifyIdentity from "../verifyIdentity/verify-identity";

export const ProfileOnboardIng = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleSearchSuccess = () => {
    setActiveStep(activeStep + 1);
  };

  let steps: StepperContentProps[] = [
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
    <>
      <OnboardingProvider>
        <Stepper steps={steps} direction="horizontal" current={activeStep} />
        <div>{steps[activeStep].content}</div>
      </OnboardingProvider>
    </>
  );
};
