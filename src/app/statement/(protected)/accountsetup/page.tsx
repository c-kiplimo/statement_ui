"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import AccountsetupPage from "./cust.details.search";

const Dev = () => {
  return (
    <Fragment>
      <AccountsetupPage />
    </Fragment>
  );
};

export default withContainer(Dev);
