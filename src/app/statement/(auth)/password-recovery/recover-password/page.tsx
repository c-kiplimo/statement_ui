"use client";

import React from "react";
import RecoverPassword from "./recover-password-components/recover-password";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import HavingTrouble from "@/src/components/widgets/having-trouble/having-trouble";

const page = () => {
  return (
    <TwosidedLayout>
    <HavingTrouble />
    <RecoverPassword />
  </TwosidedLayout>
  );
};

export default page;
