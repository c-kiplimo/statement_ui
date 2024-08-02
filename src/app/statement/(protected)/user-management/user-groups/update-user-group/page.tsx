"use client";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import React, { Fragment, useState} from "react";
import UpdateUserGroup from "./update.user.group";
import { GroupProvider } from "../context/permissionsContext";


const Dev = () => {
  return (
    <Fragment>
        <GroupProvider>
      <UpdateUserGroup/>
      </GroupProvider>
    </Fragment>
  );
};

export default withContainer(Dev);
