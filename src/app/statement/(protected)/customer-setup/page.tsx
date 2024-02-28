"use client";

import Card from "@/src/components/atoms/navigation/card/reusable_card";
import DashboardLayout from "@/src/components/molecules/dashboard/layout/dashboardLayout";
import { useTokens } from "@/src/app/(context)/ColorContext";
import React from "react";

const CustomerSetup = () => {
  const token = useTokens();
  return (
      <div className="flex flex-col m-5 h-96 p-5 bg-white space-y-4">
        <Card
          title="Customer setup Card"
          content="This is the content for Card 1"
        />

        <Card title="Customer-setup" content="This is the content for Card 2" />
      </div>
  );
};

export default CustomerSetup;
