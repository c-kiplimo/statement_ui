"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import Tabs from "@/src/components/atoms/tabs/tab-item/tab-item";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
import styles from "./user-management-header-tabs.module.css";

import UsersTab from "../../user-management-tab-bar/current-user-tab";
import RoleTable from "../permissions-tab/role-table";
import { usePathname } from "next/navigation";
import UserGroup from "../user-groups-tab-bar/user-groups-tab";
import RolePermission from "@/src/app/statement/(protected)/user-managements/create-new-roles/page";

const UserManagementHeaderTabs = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const [activePermission, setActivePermission] = useState(false);
  const [activeUserGroup, setActiveUserGroup] = useState(false);

  const token = useTokens();
  const pathname = usePathname();
  const font = useFont();

  const tabsItems = [
    {
      title: "Current Users",
      content: (
        <div>
          <UsersTab />
        </div>
      ),
    },
    {
      title: "User Groups/Roles",
      content: (
        <p style={{ background: "white", padding: "1rem" }}>
          {activeUserGroup ? (
            <RolePermission />
          ) : (
            <UserGroup setActive={setActiveUserGroup} />
          )}
        </p>
      ),
    },
    {
      title: "Permissions",
      content: (
        <Fragment>
          {activePermission ? (
            <RolePermission />
          ) : (
            <RoleTable setActive={setActivePermission} />
          )}
        </Fragment>
      ),
    },
  ];

  return (
    <div className={styles.tabcontent}>
      <div className={styles.userManagementHeaderCss}>
        <Tabs
          tabsItems={tabsItems}
          onSelectTab={(index) => setSelectedTab(index)}
          selectedTab={selectedTab}
        />
      </div>

      <div>
        <TabContent
          textColor={token.default.black}
          backgroundColor={token.accent.warning_invert_01}
          fontWeight={font.typography.body.medium.fontWeight}
          tabsItems={tabsItems}
          selectedTab={selectedTab}
        />
      </div>
    </div>
  );
};

export default UserManagementHeaderTabs;
