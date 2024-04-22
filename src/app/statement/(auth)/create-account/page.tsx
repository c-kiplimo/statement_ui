"use client";

import React from "react";
import SignUp from "./create-account-components/create-account";
import TwosidedLayout from "@/src/components/widgets/layout/two-sided-layout";
import { AuthFlowSideBar } from "@/src/components/widgets/sidebar/common.sidebar";
import simbaPic from "@/src/components/widgets/sidebar/simbaportallogo.svg";

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
        content={<SignUp />}
      />
    </div>
  );
};

export default CreateAccount;
