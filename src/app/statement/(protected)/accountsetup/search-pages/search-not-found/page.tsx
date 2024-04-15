"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import CustdetailsnotFound from "./cust.details.notFound";



const Dev = () => {
  return (
    <Fragment>
      <CustdetailsnotFound/>
    </Fragment>
  );
};

export default withContainer(Dev);
