"use client";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import React, { Fragment, Suspense, useState} from "react";
import UpdateUserGroup from "./update.user.group";
import { GroupProvider } from "../context/permissionsContext";


const Dev = () => {
  return (
    <Suspense>
        <GroupProvider>
      <UpdateUserGroup/>
      </GroupProvider>
    </Suspense>
  );
};

export default withContainer(Dev);
