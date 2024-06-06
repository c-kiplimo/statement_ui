"use client"

import React from "react";
import HeaderTabs from "./page-components/tabs/header/header-tab";

const UserManagementPage = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--Background-Background-Primary)] overflow-hidden">
      <HeaderTabs />
    </div>
  );
};

export default UserManagementPage;
