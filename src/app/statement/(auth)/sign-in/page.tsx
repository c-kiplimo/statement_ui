"use client";

import React from "react";
import SignInHelper from "./sign-in-components/signInHelper";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import { AuthFlowSideBar } from "@/src/components/widgets/sidebar/common.sidebar";
import simbaPic from "@/src/components/widgets/sidebar/simbaportallogo.svg";
import HavingTrouble from "@/src/components/widgets/having-trouble/having-trouble";

const SignIn = () => {
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
        content={<SignInHelper />}
      />
    </div>
  );
};

export default SignIn;
