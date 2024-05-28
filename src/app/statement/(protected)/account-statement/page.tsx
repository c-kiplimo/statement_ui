'use client'

import React, { Fragment } from "react";
import BranchAccountStatement from "./branch-account-statement/branch.account.statement";
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