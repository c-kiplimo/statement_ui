"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import RestrictionPage from "./restriction";

const Dev = () => {
  return (
    <Fragment>
      <RestrictionPage/>
    </Fragment>
  );
};

export default withContainer(Dev);
