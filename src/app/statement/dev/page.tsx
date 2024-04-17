"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CreateAccount from "../(auth)/create-account/page";

const Dev = () => {
  return (
    <Fragment>
      <CreateAccount/>
    </Fragment>
  );
};

export default withContainer(Dev);
