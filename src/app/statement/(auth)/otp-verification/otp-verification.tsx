import EnterOtpToVerify from "@/src/app/statement/(auth)/sign-in/sign-in-components/otp-verify/enter_otp_to_verify";
import styles from "./otp-verification.module.css";
import React from "react";

const OtpVerify = () => {
  return (
    <div className={styles.container}>
      <EnterOtpToVerify />
    </div>
  );
};

export default OtpVerify;
