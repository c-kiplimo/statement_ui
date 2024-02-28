import React, {  } from "react";
import { useActiveStep } from "@/src/app/(context)/ActiveStepContext";
import SideBarImage from "@/src/features/sidebar/image";
import styles from './siderbar.module.css'
import SiderBarDescription from "./description";


const OnboardingSiderBar = (props: OnBoardingProps) => {
  const { activeStep, setActiveStep } = useActiveStep();

  return (
    <div
      style={{
        width: props.widthSize,
        backgroundColor: props.mainColor,
        color: props.textColor,
      }}
    >
      <div
        className="m-10"
        style={{
          backgroundColor: props.mainColor,
          color: props.textColor,
        }}
      >

        <div className={styles.content}>
          <SideBarImage/>
          <SiderBarDescription title={"Welcome to simba portal."} description={"View recyclic statement, interm statement, loan statement, and query records related to KCB Bank account."}/>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSiderBar;
