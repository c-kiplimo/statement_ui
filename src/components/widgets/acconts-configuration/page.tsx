"use client";
import React, { Fragment } from "react";

import BranchAccountStatement from "@/src/components/widgets/branch-account-statement/branch.account.statement";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import StatementAccounts from "./config-acct-fetch/account";

const Dev = () => {
  return (
    <Fragment>
      {/* <StatementAccounts
              headIcon={<img src="/dice.svg" alt="dice" />}
              header={"Meraki Current Account"}
              totalAmount={"KES  |  132314245"}
              accStatus={"Last activity July, 07 2023"}
              amountHeader={"Available Balance"}
              inforIcon1={<img src="/info.svg" alt="info" />}
              inforIcon2={<img src="/info.svg" alt="info" />}
              inforIcon3={<img src="/info.svg" alt="info" />}
              amountInKES={"KES 35,071.28"}
              amountIn$={"$6,786.33/"}
              workingBalHead={"Working Balance"}
              workingBal={"$67,990.24"}
              termHeader={"Term"}
              termDuration={"12 months"}
                   /> */}
    </Fragment>
  );
};

export default withContainer(Dev);
