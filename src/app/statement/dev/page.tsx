"use client";
import React, { Fragment, useState} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import AddUserToGroup from "../(protected)/user-management/users/user-profile/widgets/add-user-group/add-user-group";
import GroupsTabs from "../(protected)/user-management/user-groups/tabs/userGroupsTabs";

const Dev = () => {
  return (
    <Fragment>
      <GroupsTabs/>
    </Fragment>
  );
};

export default withContainer(Dev);
