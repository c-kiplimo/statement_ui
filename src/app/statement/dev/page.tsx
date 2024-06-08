"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import StepperNav from "@/src/components/widgets/user-management/stepper-nav/stepper-nav";
import UserGroups from "../(protected)/accountsetup/users/user-group/user.groups";
import UserViewProfilePage from "../(protected)/accountsetup/user-view-profile/user.view.profile";




const Dev = () => {
  return (
    <Fragment>
      <StepperNav/>
    </Fragment>
  );
}

export default withContainer(Dev);
