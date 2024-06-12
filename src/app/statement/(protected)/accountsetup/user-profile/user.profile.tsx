import React, { useState, useEffect, useMemo } from "react";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import { profileDetails } from "@/src/lib/actions/profile.action";
import styles from "./user.profile.module.css";
import { Spin } from "antd";
import AccountsPage from "../accounts/accounts";
import ActivitiesStatus from "../activities/activities.status";
import CustomerUsers from "../users/customer-users/users.status";
import TabNavigations from "../widgets/acctSetup-navigations-items/tab.navigations";
import RestrictionsOverview from "../restrictions/restrictions-overview/restrictions.overview";


interface TabItem {
  buttonName: string;
  bodyContent: React.ReactNode;
}
interface TabsNavProps {
  
}

type Profile = {
  userName: string;
  industry: string;
  town: string;
  customerType: string;
};

type UserProfileProps = {
  userId?: number;
};

const Userprofile: React.FC<UserProfileProps> = ({
  userId,
}: UserProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      if (!userId) {
        setError("User ID is not provided");
        setLoading(false);
        return;
      }
      
      try {
        const profileData = await profileDetails(userId.toString());
        setProfile(profileData);
      } catch (err) {
        setError("Failed to fetch profile details");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, [userId]);



  const tabItems: TabItem[] = [

    {
      buttonName: 'Users',
      bodyContent: <CustomerUsers userId={userId} key="users" />,
    },
    {
      buttonName: 'Accounts',
      bodyContent: <AccountsPage userId={userId} key="accounts" />,
    },
    {
      buttonName: 'Activities',
      bodyContent: <ActivitiesStatus userId={userId} key="activities" />,
    },
    {
      buttonName: 'Restrictions',
      bodyContent: <RestrictionsOverview userId={userId} key="restrictions" />,
    },
  ];

  const getLastLoginTime = useMemo(() => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  }, []);

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className={styles.container}>
      <LastLogin
        userName={profile.userName}
        industry={profile.industry}
        town={profile.town}
        customerType={profile.customerType}
        timezone={`GMT ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
        lastSeenTime={`Last login on ${getLastLoginTime}`}
        userId={userId}
        icon={<img src="/teamusericon.png" alt="teamusericon" />}
      />
      <TabNavigations tabItems={tabItems}/>
    </div>
  );
};

export default Userprofile;
