"use client";

import React from "react";
import HeaderTabs from "./page-components/tabs/header/header-tab";
import { FormProvider } from "./context/userGroupContext";

const UserManagementPage = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--Background-Background-Primary)] overflow-hidden">
      <FormProvider>
        <HeaderTabs />
      </FormProvider>
    </div>
  );
};

export default UserManagementPage;
