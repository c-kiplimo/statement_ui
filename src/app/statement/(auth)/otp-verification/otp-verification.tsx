import EnterOtpToVerify from "@/src/components/widgets/otp-verify/enter_otp_to_verify";
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
