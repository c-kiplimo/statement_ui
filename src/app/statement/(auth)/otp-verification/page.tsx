"use client";

import React from "react";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import HavingTrouble from "@/src/components/widgets/having-trouble/having-trouble";
import OtpVerify from "./otp-verification";

const OtpVerification = () => {
  return (
    <TwosidedLayout>
      <HavingTrouble />
      <OtpVerify />
    </TwosidedLayout>
  );
};

export default OtpVerification;
