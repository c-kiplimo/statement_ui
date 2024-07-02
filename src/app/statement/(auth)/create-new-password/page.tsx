"use client";

import React from "react";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import NewPasswordHelper from "./newPasswordHelper";
import HavingTrouble from "@/src/components/widgets/having-trouble/having-trouble";

const page = () => {
  return (
    <TwosidedLayout>
      <HavingTrouble />
      <NewPasswordHelper />
    </TwosidedLayout>
  );
};

export default page;
