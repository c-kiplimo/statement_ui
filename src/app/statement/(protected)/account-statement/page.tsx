'use client'

import React, { Fragment } from "react";
import AccountStatement from "../(module)/account-statement/account-statement";
import BranchAccountStatement from "@/src/components/widgets/branch-account-statement/branch.account.statement";

const AccountStatementPage = () => {
  return (
    <Fragment>
      <div style={{width:'100%'}}>
        <BranchAccountStatement/>
      </div>
    </Fragment>
  );
};

export default AccountStatementPage;