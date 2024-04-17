import React, { ReactNode } from "react";
import { Steps } from "antd";
import styles from "./stepper.module.css";

const { Step } = Steps;

type StepperProps = {
  steps: { title: ReactNode }[];
  direction:"horizontal" | "vertical";
  current: number;
  onChange: (current: number) => void;
};

const Stepper = ({ steps,direction, current, onChange }: StepperProps) => {
  const handleStepClick = (step: number) => {
    onChange(step);
  };

  return (
    <div className={styles.stepperContainer}>
      <Steps current={current} direction={direction} className="bodyr">
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
