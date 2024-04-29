"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
// import AccountsetupPage from "./search-pages/search/cust.details.search";
import ActivitiesStatus from "../activities/activities.status"


const Dev = () => {
  return (
    <Fragment>
      <ActivitiesStatus />
    </Fragment>
  );
};

export default withContainer(Dev);
