"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import UserGroupsHomePage from "../(protected)/usermanagement/user-groups/groups";

const Dev = () => {


  return (
    <Fragment>
      <UserGroupsHomePage/>
    </Fragment>
  );
};

export default withContainer(Dev);
