"use client";

import DashboardLayout from "@/src/components/molecules/dashboard/layout/dashboardLayout";
import { useTokens } from "@/src/app/(context)/ColorContext";
import React from "react";

import AccountSetupRestriction from "@/src/components/molecules/account-setup/account-setup-restriction/account-set-restriction";

const UserSetup = () => {
  const token = useTokens();
  return (
    <AccountSetupRestriction />
  );
};

export default UserSetup;
