"use client";
import React, { Fragment, useState} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import PermissionAssign from "../(protected)/user-management/user-groups/update-user-group-permissions/permission.assign";


const Dev = () => {
  return (
    <Fragment>
      <PermissionAssign/>
    </Fragment>
  );
};

export default withContainer(Dev);
