"use client";

import React from "react";

import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import { AuthFlowSideBar } from "@/src/components/widgets/sidebar/common.sidebar";
import simbaPic from "@/src/components/widgets/sidebar/simbaportallogo.svg";
import NewPasswordHelper from "./newPasswordHelper";
import HavingTrouble from "@/src/components/widgets/having-trouble/having-trouble";

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
        link={<HavingTrouble />}
        content={<NewPasswordHelper />}
      />
    </div>
  );
};

export default page;
