import React from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";
import { usePlatformId } from "@/src/hooks/platformId";
import TabNav from "@/src/components/widgets/tab-nav/tab-.nav";
import UserActivity from "./user-activity/user-activity";
import UserDetails from "./(user-details)/user-detail";
import UserGroups from "./user-group-data/user-groups-data";


type TabItem = {
  buttonName: string;
  bodyContent: React.ReactNode;
};

const UserProfile = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const platformId:number = usePlatformId();

  const tabItems: TabItem[] = [
    {
      buttonName: "User Groups",
      bodyContent: <UserGroups userId={userId!} platformId={platformId} />,
    },
    {
      buttonName: "User Activity",
      bodyContent: <UserActivity userId={userId!.toString()}/>,
    },
  ];

  return (
      <div className="flex flex-col p-4 bg-[var(--Background-Background-Primary)] w-full h-auto overflow-hidden">
        <div className={styles.header}>
        <UserDetails userId={userId!} />
        </div>
        <div className={styles.tabs}>
          <TabNav tabItems={tabItems} />
        </div>
      </div>
  );
};

export default UserProfile;


