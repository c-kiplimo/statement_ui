import React from "react";
import { Steps } from "antd";
import styles from "./stepper.module.css";

const { Step } = Steps;

type StepperProps = {
  steps: { title: string }[];
  current: number;
  onChange: (current: number) => void;
};

const Stepper = ({ steps, current, onChange }: StepperProps) => {
  const handleStepClick = (step: number) => {
    onChange(step);
  };

  return (
    <div className={styles.stepperContainer}>
      <Steps
        current={current}
        size="small"
        direction="horizontal"
        className={`${styles.customSteps} bodyr`}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            title={step.title}
            onClick={() => handleStepClick(index)}
          />
        ))}
      </Steps>
    </div>
  );
};

export default Stepper;
