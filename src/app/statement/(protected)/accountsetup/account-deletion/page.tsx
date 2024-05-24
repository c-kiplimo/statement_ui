"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import AccountsDelete from "./account.deletion";


const Dev = () => {
  return (
    <Fragment>
      <AccountsDelete />
    </Fragment>
  );
};

export default withContainer(Dev);
