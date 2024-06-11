"use client"
import React, { useState, useEffect, useMemo } from "react";
import styles from "./user.view.profile.module.css";
import UserViewProfile from "../widgets/users-view-widget/user.groups";
import ContactDetails from "../users/user-contact-details/contacts";
import ActivityPopup from "../users/user-activities/activity.popup";
import UserAccounts from "../users/user-accounts/accounts";
import UserGroups from "../users/user-group/user.groups";
import TabNavigations from "../widgets/acctSetup-navigations-items/tab.navigations";
import { UserprofileDetails } from "@/src/lib/actions/customer.user.action";

export type userProfile = {
  userId: number;
  username: string;
  email: string;
  role: string;
  status: string;
};

interface TabItem {
  buttonName: string;
  bodyContent: React.ReactNode;
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

const UserViewProfilePageModal: React.FC<UserProfileProps> = ({ userId }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userprofileinfor, setuserprofileinfor] = useState<userProfile | null>(null);

  const tabItems: TabItem[] = [
    {
      buttonName: 'Groups',
      bodyContent: <UserGroups userId={userId!.toString()} />,
    },
    {
      buttonName: 'Accounts',
      bodyContent: <UserAccounts userId={userId!.toString()} />,
    },
    {
      buttonName: 'Activities',
      bodyContent: <ActivityPopup userId={userId!.toString()} />,
    },
    {
      buttonName: 'Contacts',
      bodyContent: <ContactDetails />,
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

  useEffect(() => {
    const profDataInfor = async () => {
      try {
        const data = await UserprofileDetails(userId!.toString());
        setuserprofileinfor(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user profile");
        setLoading(false);
      }
    };
    profDataInfor();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.container}>
        <UserViewProfile
          userIcon={<img src="/userIcon.svg" alt="userIcon" />}
          title={userprofileinfor?.username || ''}
          titleDescript={userprofileinfor?.role || ''}
          lastseen={"Last login on 45 minutes ago"}
          mail={userprofileinfor?.email || ''}
          location={"Kigali-Rwanda"}
          timezone={"( GMT -11:46) Greenwich mean Time zone"}
          updatebttn={"Update User"}
        />
        <TabNavigations tabItems={tabItems} />
      </div>
      
    </div>
  );
};

export default UserViewProfilePageModal;
