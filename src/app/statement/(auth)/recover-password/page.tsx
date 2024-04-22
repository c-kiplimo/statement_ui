"use client";

import React from "react";
import RecoverPassword from "./recover-password-components/recover-password";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import { AuthFlowSideBar } from "@/src/components/widgets/sidebar/common.sidebar";
import simbaPic from "@/src/components/widgets/sidebar/simbaportallogo.svg";

const page = () => {
  return (
    <div>
      <TwosidedLayout
        sidebar={
          <AuthFlowSideBar
            title={"Simba"}
            description={"Portal"}
            icon={simbaPic}
          />
        }
        content={<RecoverPassword />}
      />
    </div>
  );
};

export default page;
