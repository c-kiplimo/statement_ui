"use client";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import React, { Fragment } from "react";
import styles from "./userGroupsTabs.module.css"
import CreateUserroups from "./create.user.groups";




const Dev = () => {
  return (
    <Fragment >
      <CreateUserroups/>
    </Fragment>
  );
};

export default withContainer(Dev);
