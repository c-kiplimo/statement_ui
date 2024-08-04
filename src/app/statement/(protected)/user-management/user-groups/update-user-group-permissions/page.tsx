"use client";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import React, { Fragment, useState} from "react";
import PermissionAssign from "./permission.assign";


const Dev = () => {
  return (
    <Fragment>
      <PermissionAssign/>
    </Fragment>
  );
};

export default withContainer(Dev);
