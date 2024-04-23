"use client";

import React, { useState } from "react";
import { items } from "@/src/app/statement/(auth)/data";
import styles from "./onBoardingComponents/stepperContent.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";
import Stepper from "@/src/components/atoms/navigation/stepper/stepper";
import StepperContent from "@/src/components/atoms/navigation/stepper/stepper-content";
import Profile from "@/src/app/statement/(protected)/onBoarding/onBoardingComponents/profile/profile";
import AccountFound from "@/src/components/widgets/account-found/account-found";

const TestOnBoarding = () => {
  const token = useTokens();
  const [activeStep, setActiveStep] = useState(0);
  const defaultColor = token.text.secondary;

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  const stepperOptions = items.map((step: any, index: any) => ({
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
    onClick: () => handleStepClick(index),
  }));

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.stepperCard}>
          <Stepper
            steps={stepperOptions}
            direction="horizontal"
            current={activeStep}
            onChange={handleStepClick}
          />
        </div>
        <div className={styles.stepperContent}>
          <StepperContent marginTop="6rem">
            {activeStep === 0 && <Profile />}
          </StepperContent>
          <StepperContent marginTop="6rem">
            {activeStep === 1 && <AccountFound />}
          </StepperContent>
        </div>
      </div>
    </div>
  );
};

export default TestOnBoarding;
