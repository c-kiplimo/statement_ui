import React from "react";
import { useSearchParams } from "next/navigation";
import styles from "./customer-profile.module.css";
import CompanyInfo from "../../../user-management/(company-info)/company-info";
import TabNav from "@/src/components/widgets/tab-nav/tab-.nav";
import SchedulesTable from "../../../account-setup-self/schedules/schedules-table/schedules.table";

const CustomerProfile = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  let custId: string = "";
  if (customerId !== null && customerId !== undefined) {
    custId = customerId;
    console.log(custId);
  }

  const tabItems: TabItem[] = [
    {
      buttonName: "Schedule",
      bodyContent: <SchedulesTable customerId={parseInt(custId!)} />,
    },
    {
      buttonName: "Activity",
      bodyContent: "",
    },
    {
      buttonName: "Restrictions",
      bodyContent: "",
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
