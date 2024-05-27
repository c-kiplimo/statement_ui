"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import AccountsetupPage from "./search-pages/search/cust.details.search";
import { AccountProfileProvider } from "./context/account.contex";


const Dev = () => {
  return (
    <AccountProfileProvider>
    <Fragment>
      <AccountsetupPage />
    </Fragment>
    </AccountProfileProvider>
  );
};

export default withContainer(Dev);
