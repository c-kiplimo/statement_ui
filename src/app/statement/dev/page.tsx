"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Userprofile from "../(protected)/accountsetup/user-profile/user.profile";
import UserTable from "./test";

const Dev = () => {
  return (
    <Fragment>
      <UserTable/>
    </Fragment>
  );
};

export default withContainer(Dev);
