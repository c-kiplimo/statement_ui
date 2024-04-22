"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import UserAccountprofile from "./account.profile";



const Dev = () => {
  return (
    <Fragment>
      <UserAccountprofile/>
    </Fragment>
  );
};

export default withContainer(Dev);

