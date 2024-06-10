"use client"
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import dynamic from "next/dynamic";
const AccountsPage = dynamic(() => import("./accounts"), { ssr: false });
const Dev = () => {
  return (
    <Fragment>
        <AccountsPage />
     
    </Fragment>
  );
};

export default withContainer(Dev);
