import React from "react";
import UserManagementHeaderTabs from "@/src/components/molecules/user-management/tabs/user-management-header-tabs/user-management-header-tabs";

const UserManagementPage = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--Background-Background-Primary)] overflow-hidden">
      <UserManagementHeaderTabs />
    </div>
  );
};

export default UserManagementPage;
