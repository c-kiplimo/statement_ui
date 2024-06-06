"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import StepperNav from "@/src/components/widgets/user-management/stepper-nav/stepper-nav";




const Dev = () => {
  return (
    <Fragment>
      <StepperNav/>
    </Fragment>
  );
}

export default withContainer(Dev);
