"use client";

import React, { useState } from "react";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { Tabs } from "antd";
import styles from "./user-management-header-tabs.module.css";
import RolePermission from "@/src/app/statement/(protected)/user-management/create-new-roles/page";
import UsersTab from "../user-management/user-management-tab-bar/current-user-tab";
import UserGroup from "../user-management/tabs/user-groups-tab-bar/user-groups-tab";
import RoleTable from "../user-management/tabs/permissions-tab/role-table";

const UserManagementHeaderTabs = () => {
  const [activePermission, setActivePermission] = useState(false);
  const [activeUserGroup, setActiveUserGroup] = useState(false);

  const token = useTokens();
  const font = useFont();

  const tabsItems = [
    {
      key: "1",
      label: "Users",
      children: <UsersTab />,
    },
    {
      key: "2",
      label: "User Groups",
      children: (
        <div style={{padding: "1rem" }}>
          {activeUserGroup ? (
            <RolePermission />
          ) : (
            <UserGroup setActive={setActiveUserGroup} />
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: "Permissions",
      children: activePermission ? (
        <RolePermission />
      ) : (
        <RoleTable setActive={setActivePermission} />
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Tabs
          defaultActiveKey="1"
          items={tabsItems}
          tabBarStyle={{
            color: token.default.black,
            fontWeight: font.typography.body.medium.fontWeight,
          }}
          tabPosition="top"
          onChange={(key) => {
            console.log(`Selected tab: ${key}`);
          }}
        />
      </div>
    </div>
  );
};

export default UserManagementHeaderTabs;
