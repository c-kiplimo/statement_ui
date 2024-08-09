"use client";
import React, { Fragment, Suspense } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import PermissionsList from "./permissions.list";
import { GroupProvider } from "../context/permissionsContext";

const Dev = () => {
  return (
    <Suspense>
        <GroupProvider>
      <PermissionsList/>
      </GroupProvider>
    </Suspense>
  );
};

export default withContainer(Dev);
