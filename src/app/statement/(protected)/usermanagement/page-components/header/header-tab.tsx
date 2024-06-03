import React, { Fragment, useState } from "react";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import styles from "./header-tab.module.css";
//import UsersTab from "../../user-management-tab-bar/current-user-tab";
//import RoleTable from "../permissions-tab/role-table";
import RolePermission from "@/src/app/statement/(protected)/user-management/create-new-roles/page";
//import UserGroup from "../user-groups-tab-bar/user-groups-tab";
import Tabs from "@/src/components/atoms/tabs/tab-item/tab-item";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
//import UsersTab from "../users/users";
import RoleTable from "@/src/components/widgets/user-management/tabs/permissions-tab/role-table";
import Users from "@/src/components/widgets/user-management/tabs/users/users";
import UserGroup from "@/src/components/widgets/user-management/tabs/user-groups-tab-bar/user-groups-tab";

const HeaderTabs = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [activePermission, setActivePermission] = useState(false);
  const [activeUserGroup, setActiveUserGroup] = useState(false);

  const token = useTokens();
  const font = useFont();

  const tabsItems = [
    {
      title: "Users",
      content: <Users />,
    },
    {
      title: "User Groups",
      content: (
        <div style={{ background: "white", padding: "1rem" }}>
          {activeUserGroup ? (
            <RolePermission />
          ) : (
            <UserGroup setActive={setActiveUserGroup} />
          )}
        </div>
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

export default HeaderTabs;
