"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import ActivitiesStatus from "./activities/activities.status";

const Dev = () => {
  return (
    <Fragment>
      <ActivitiesStatus />
    </Fragment>
  );
};

export default withContainer(Dev);
