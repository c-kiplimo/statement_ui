"use client"

import React from "react";
import styles from "./page-components/page.module.css"
import HeaderTabs from "./page-components/header/header-tab";
//import HeaderTabs from "@/src/components/widgets/user-management/tabs/header/header-tab";

const UserManagementPage = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--Background-Background-Primary)] overflow-hidden">
      <HeaderTabs />
    </div>
  );
};

export default UserManagementPage;
