"use client";
import React, { Fragment, useState} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import UpdateUser from "../(protected)/user-management/users/updateUser/widgets/updateUser";

const Dev = () => {
  return (
    <Fragment>
      <UpdateUser/>
    </Fragment>
  );
};

export default withContainer(Dev);
