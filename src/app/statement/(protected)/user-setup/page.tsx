"use client";

import Card from "@/src/components/atoms/navigation/card/reusable_card";
import DashboardLayout from "@/src/components/molecules/dashboard/layout/dashboardLayout";
import { useTokens } from "@/src/app/(context)/ColorContext";
import React from "react";
import AccountSetupActivity from "@/src/components/molecules/account-setup-activity/account-setup-activity";

const UserSetup = () => {
  const token = useTokens();
  return (
      <div>
        <AccountSetupActivity />
      </div>
  );
};

export default UserSetup;
