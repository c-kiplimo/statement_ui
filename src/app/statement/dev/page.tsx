"use client";
import React, { Fragment, useState} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import AddUserToGroup from "../(protected)/user-management/users/user-profile/widgets/add-user-group/add-user-group";

const Dev = () => {
  return (
    <Fragment>
      <AddUserToGroup/>
    </Fragment>
  );
};

export default withContainer(Dev);
