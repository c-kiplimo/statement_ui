"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
//import UserManagementHeaderTabs from "@/src/components/molecules/user-management/tabs/user-management-header-tabs/user-management-header-tabs";
import HeaderTabs from "@/src/components/widgets/user-management/tabs/header/header-tab";


const Dev = () => {
    return (
    <Fragment>
      <div className="w-full min-h-screen bg-[var(--Background-Background-Primary)] overflow-hidden">
      <HeaderTabs />
    </div>
    </Fragment>
  );
};

export default withContainer(Dev);
