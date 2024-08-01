"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import PermissionsList from "../(protected)/user-management/user-groups/permissionsListPage/permissions.list";
import { GroupProvider } from "../(protected)/user-management/user-groups/context/permissionsContext";


const Dev = () => {
  return (
    <Fragment>
      <GroupProvider>
      <PermissionsList/>
      </GroupProvider>
    </Fragment>
  );
};

export default withContainer(Dev);
