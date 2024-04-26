"use client";

import React from "react";
import SignUp from "./create-account-components/create-account";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import { AuthFlowSideBar } from "@/src/components/widgets/sidebar/common.sidebar";
import simbaPic from "@/src/components/widgets/sidebar/simbaportallogo.svg";
import HavingTrouble from "@/src/components/widgets/having-trouble/having-trouble";

const CreateAccount = () => {
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
        content={<SignUp />}
      />
    </div>
  );
};

export default CreateAccount;
