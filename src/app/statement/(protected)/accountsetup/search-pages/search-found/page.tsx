"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import Custdetailsfound from "./cust.details.found";




const Dev = () => {
  return (
    <Fragment>
      <Custdetailsfound/>
    </Fragment>
  );
};

export default withContainer(Dev);
