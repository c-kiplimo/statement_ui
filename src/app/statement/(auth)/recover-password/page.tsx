"use client";

import React from "react";
import RecoverPassword from "./recover-password-components/recover-password";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";

const page = () => {
  return (
    <div>
      <TwosidedLayout sidebar="" content={<RecoverPassword />} />
    </div>
  );
};

export default page;
