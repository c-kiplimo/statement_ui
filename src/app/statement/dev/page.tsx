"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import GroupsPermissions from "../(protected)/user-management/user-groups/group-permissions-home-page/group.permissions";

const Dev = () => {

  
  return (
    <Fragment>
      <GroupsPermissions/>
    </Fragment>
  );
};

export default withContainer(Dev);