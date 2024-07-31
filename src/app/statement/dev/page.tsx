"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import DeleteGroupUser from "../(protected)/user-management/user-groups/delete-user-groups/delete.group.user";
import GroupUsers from "../(protected)/user-management/user-groups/group-users-home-page/group.users";

const Dev = () => {

  
  return (
    <Fragment>
      <GroupUsers />
    </Fragment>
  );
};

export default withContainer(Dev);