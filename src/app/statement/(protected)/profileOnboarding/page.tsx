"use client";
import React, { ReactNode, useState } from "react";
import styles from "./components/page.module.css"
import { ProfileOnboardIng } from "./components/profile-onboarding/profile-onboarding";

const TestOnBoarding = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ProfileOnboardIng></ProfileOnboardIng>
      </div>
    </div>
  );
};

export default TestOnBoarding;
