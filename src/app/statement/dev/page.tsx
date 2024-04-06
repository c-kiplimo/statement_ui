"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Activitystatus from "@/src/components/widgets/activitieStatus/activity.status";

const Dev = () => {
  
  return (
    <Fragment>

        <Activitystatus title={"Transaction History"}/>
    </Fragment>
  );
};

export default withContainer(Dev);
