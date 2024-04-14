"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import Accountsstatus from "./users/users.status";



const Dev = () => {
  return (
    <Fragment>
      <Accountsstatus/>
    </Fragment>
  );
};

export default withContainer(Dev);
