"use client";
import React from "react";
import styles from "./userGroupsTabs.module.css";
import TabNav from "@/src/components/widgets/tab-nav/tab-.nav";
import GroupsPermissions from "../group-permissions-home-page/group.permissions";
import GroupsUserprofile from "@/src/components/widgets/user-groups-profile/user.groups.profile";
import GroupUsers from "../group-users-home-page/group.users";
import { useSearchParams } from "next/navigation";

type TabItem = {
  buttonName: string;
  bodyContent: React.ReactNode;
};

const GroupsTabs = () => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');

  const tabItems: TabItem[] = [
    {
      buttonName: "Permissions",
      bodyContent: <GroupsPermissions groupId={groupId!.toString()} key="permissions" />,
    },
    {
      buttonName: "Members",
      bodyContent: <GroupUsers groupId={groupId!.toString()} key={"members"}/>,
    },
  ];

  return (
    <div className="flex flex-col p-4 bg-[] w-full h-auto">
      <GroupsUserprofile
        groupIdId={"profId!"}
        icon={"F"}
        title={"Financial Managers"}
        totalusers={"(12 Members)"}
        address={"Meraki Systems Co"}
        status={"ACTIVE"}
      />
      <div className={styles.tabs}>
        <TabNav tabItems={tabItems} />
      </div>
    </div>
  );
};

export default GroupsTabs;
