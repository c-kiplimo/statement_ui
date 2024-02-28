import Card from "@/src/components/atoms/navigation/card/reusable_card";
import DashboardLayout from "@/src/components/molecules/dashboard/layout/dashboardLayout";
import React from "react";

const Setting = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col m-5 h-96 p-5 bg-white space-y-4">
        <Card title="Card 1" content="This is the content for Card 1" />

        <Card title="Card 2" content="This is the content for Card 2" />
      </div>
    </DashboardLayout>
  );
};

export default Setting;
