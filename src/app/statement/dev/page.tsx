"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import BranchAccountStatement from "@/src/components/widgets/branch-account-statement/branch.account.statement";


const Dev = async () => {
  return (
  <Fragment>

      <div style={{width:'100%'}}>
        <BranchAccountStatement/>
      </div>
  </Fragment>);
};

export default withContainer(Dev);
