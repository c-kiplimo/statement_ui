"use client"
import React from "react";
import { useSearchParams } from "next/navigation";
import styles from "./customer-profile.module.css";
import CompanyInfo from "../../../user-management/(company-info)/company-info";
import TabNav from "@/src/components/widgets/tab-nav/tab-.nav";
import SchedulesTable from "../../../account-setup-self/schedules/schedules-table/schedules.table";
import RestrictionsPage from "../../../account-setup-self/restrictons/restriction";
import ActivitiesPage from "../../../account-setup-self/activity/activity";
import { AccountInfoProvider } from "../../../account-setup-self/schedules/schedules-context/accountInforContext";

const CustomerProfile = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  let custId: string = "";
  if (customerId !== null && customerId !== undefined) {
    custId = customerId;
    
  }

  const tabItems: TabItem[] = [
    {
      buttonName: "Schedule",
      bodyContent: <AccountInfoProvider><SchedulesTable customerId={parseInt(custId!)} /> </AccountInfoProvider> ,
    },
    {
      buttonName: "Activity",
      bodyContent: <ActivitiesPage customerId={parseInt(custId!)}/>,
    },
    {
      buttonName: "Restrictions",
      bodyContent: <RestrictionsPage customerId={parseInt(custId!)}/>,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <CompanyInfo customerId={parseInt(custId!)} />
      </div>
      <div className={styles.tabs}>
        <TabNav tabItems={tabItems} />
      </div>
    </div>
  );
};

export default CustomerProfile;
