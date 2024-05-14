import React, { ReactNode } from "react";
import { Steps } from "antd";
import styles from "./stepper.module.css";

const { Step } = Steps;


export type StepperContentProps ={
  title: string,
  content?: ReactNode
  description?: ReactNode
}

type StepperProps = {
  steps: StepperContentProps[];
  direction:"horizontal" | "vertical";
  current: number;
};

const Stepper = ({ steps,direction, current}: StepperProps) => {
  return (
    <div className={styles.stepperContainer}>
      <Steps current={current} direction={direction} className="bodyr" items={steps}/>
    </div>
  );
};

export default Stepper;
