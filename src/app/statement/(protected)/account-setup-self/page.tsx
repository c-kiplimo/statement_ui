"use client"

import React from "react";
import styles from "./page.module.css";
import useProfileId from '@/src/hooks/profileId'
import RestrictionsPage from "./restrictons/restriction";
import ActivitiesPage from "./activity/activity";
import TabNav from "@/src/components/widgets/tab-nav/tab-.nav";
import CompanyInfo from "../user-management/(company-info)/company-info";
import SchedulesTable from "./schedules/schedules-table/schedules.table";
import { AccountInfoProvider } from "./schedules/schedules-context/accountInforContext";

const AccountSetupSelf = () => {
    const customerId = useProfileId();
    let custId: number = 0;
    if (customerId !== null && customerId !== undefined) {
      custId = customerId;
    }

    const tabItems: TabItem[] = [
      {
        buttonName: "Schedule",
        bodyContent: <AccountInfoProvider><SchedulesTable customerId={custId!} /> </AccountInfoProvider>,
      },
      {
        buttonName: "Activity",
        bodyContent: <ActivitiesPage customerId={custId!} />,
      },
      {
        buttonName: "Restrictions",
        bodyContent: <RestrictionsPage customerId={custId!} />,
      },
    ];
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <CompanyInfo customerId={custId!} />
      </div>
      <div className={styles.tabs}>
        <TabNav tabItems={tabItems} />
      </div>
    </div>
  );
};

export default AccountSetupSelf;

