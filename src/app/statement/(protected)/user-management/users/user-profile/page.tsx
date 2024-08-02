"use client";

import React, { Suspense} from "react";
import styles from "./widgets/page.module.css";
import { useSearchParams } from "next/navigation";
import { usePlatformId } from "@/src/hooks/platformId";
import TabNav from "@/src/components/widgets/tab-nav/tab-.nav";
import UserGroups from "./widgets/user-groups/user-groups";
import UserDetails from "./widgets/(user-details)/user-detail";
import UserActivity from "./widgets/user-activity/user-activity";


type TabItem = {
  buttonName: string;
  bodyContent: React.ReactNode;
};

const UserProfilePage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const platformId = usePlatformId();

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
    <Suspense>
      <div className="flex flex-col p-4 bg-[var(--Background-Background-Primary)] w-full h-auto overflow-hidden">
        <div className={styles.header}>
        <UserDetails userId={userId!} />
        </div>
        <div className={styles.tabs}>
          <TabNav tabItems={tabItems} />
        </div>
      </div>
    </Suspense>
  );
};

export default UserProfilePage;


