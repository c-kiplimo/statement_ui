"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CreateUserroups from "../(protected)/usermanagement/user-groups-home-page/create-user-groups-form/create.user.groups";


const Dev = () => {
  return (
    <Fragment>

      <CreateUserroups/>
    </Fragment>
  );
};

export default withContainer(Dev);