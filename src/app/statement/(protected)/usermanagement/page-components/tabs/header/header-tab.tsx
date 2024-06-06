import React, { Fragment, useState } from "react";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import styles from "./header-tab.module.css";
import RolePermission from "@/src/app/statement/(protected)/user-management/create-new-roles/page";
import Tabs from "@/src/components/atoms/tabs/tab-item/tab-item";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
import RoleTable from "@/src/app/statement/(protected)/usermanagement/page-components/tabs/permissions-tab/role-table";
import UserGroup from "../user-group/user-group";
import Users from "../users-tab/users-tab";


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
        <div style={{ background: "white", padding: "16px" }}>
          {activeUserGroup ? (
            <RolePermission />
          ) : (
            <UserGroup
          setActive={setActiveUserGroup}
              />
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
