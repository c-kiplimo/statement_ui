"use client";
import React from "react";
import styles from "./page.module.css";
import useProfileId from "@/src/hooks/profileId";
import CompanyInfo from "./company-info/company-info";
import UsersHome from "./users/users";
import PermissionPage from "./permissions/page";
import UserGroupsHomePage from "./user-groups/groups";
import TabNav from "@/src/components/widgets/tab-nav/tab-.nav";

type TabItem = {
  buttonName: string;
  bodyContent: React.ReactNode;
};

const page = () => {
  const profId = useProfileId();

  const tabItems: TabItem[] = [
    {
      buttonName: "Users",
      bodyContent: <UsersHome customerId={profId!} key="users" />,
    },
    {
      buttonName: "User Groups",
      bodyContent: <UserGroupsHomePage />,
    },
    {
      buttonName: "Permissions",
      bodyContent: <PermissionPage />,
    },
  ];

  return (
    <div className="flex flex-col p-4 bg-[var(--Background-Background-Primary)] w-full h-auto">
      <CompanyInfo customerId={profId!} />
      <div className={styles.tabs}>
        <TabNav tabItems={tabItems} />
      </div>
    </div>
  );
};

export default page;
