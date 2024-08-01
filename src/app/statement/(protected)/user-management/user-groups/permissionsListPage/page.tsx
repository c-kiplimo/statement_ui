"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import PermissionsList from "./permissions.list";
import { GroupProvider } from "../context/permissionsContext";

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
