"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import PermissionsList from "../(protected)/user-management/user-groups/permissionsListPage/permissions.list";


const Dev = () => {
  return (
    <Fragment>
      <PermissionsList/>
    </Fragment>
  );
};

export default withContainer(Dev);
