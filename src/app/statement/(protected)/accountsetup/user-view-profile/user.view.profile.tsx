"use client"
import React, { useState, useEffect, useMemo } from "react";
import { profileDetails } from "@/src/lib/actions/profile.action";
import styles from "./user.view.profile.module.css";

import { Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import UserViewProfile from "../widgets/users-view-widget/user.groups";
import { useViewUserProfileContext } from "../context/customer.view.contex";
import ContactDetails from "../users/user-contact-details/contacts";
import ActivityPopup from "../users/user-activities/activity.popup";
import UserAccounts from "../users/user-accounts/accounts";
import UserGroups from "../users/user-group/user.groups";
import TabNavigations from "../widgets/acctSetup-navigations-items/tab.navigations";

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

const UserViewProfilePageModal: React.FC<UserProfileProps> = ({ userId }: UserProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userId: contextUserId, updateUser } = useViewUserProfileContext();
  const [viewUser, setViewUser] = useState(false);

  // useEffect(() => {
  //   if (userId !== undefined) {
  //     updateUser(userId);
  //   }
  // }, [userId, updateUser]);

  // useEffect(() => {
  //   const fetchProfileDetails = async () => {
  //     const currentUserId = userId !== undefined ? userId : contextUserId;

  //     if (currentUserId === undefined) {
  //       setError("User ID is not provided");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const profileData = await profileDetails(currentUserId.toString());
  //       setProfile(profileData);
  //     } catch (err) {
  //       setError("Failed to fetch profile details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfileDetails();
  // }, [userId, contextUserId]);

  const getLastLoginTime = useMemo(() => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} ${time}`;
  }, []);

  // if (loading) {
  //   return (
  //     <div className={styles.spinnerContainer}>
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!profile) {
  //   return <div>No profile data available</div>;
  // }


  const tabItems: TabItem[] = [

    {
      buttonName: 'Groups',
      bodyContent: <UserGroups/>
    }, 
    
    {
      buttonName: 'Accounts',
      bodyContent: <UserAccounts/>,
    },
    {
      buttonName: 'Activities',
      bodyContent: <ActivityPopup/>,
    },
    {
      buttonName: 'Contacts',
      bodyContent: <ContactDetails/>
    },
  ];
  return (
    <div
    className={styles.modalBackdrop}>
    <div className={styles.container}>
      <div className={styles.cancel}>
        <CloseOutlined />
      </div>
      <UserViewProfile
        userIcon={<img src="/userIcon.svg" alt="userIcon" />}
        title={"Abia Mbabazi"}
        titleDescript={"Viewer"}
        lastseen={"Last login on 45 minutes ago"}
        button1={"Groups"}
        button2={"Accounts"}
        button3={"Activity"}
        button4={"Contact Details"}
        button5={"Two-factor Authentication"}
        mail={"abbymbabazi@gmail.com"}
        location={"Kigali-Rwanda"}
        timezone={"( GMT -11:46) Greenwich mean Time zone"}
        updatebttn={"Update User"}
      />
      <TabNavigations tabItems={tabItems}/>
    </div>
    </div>
  );
};

export default UserViewProfilePageModal;
