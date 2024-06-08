"use client"
import React, { useState } from 'react';
import styles from "./user.view.tabs.module.css";
import TabNavigations from '../../widgets/acctSetup-navigations-items/tab.navigations';
import UserViewProfile from '../../user-view-profile/user.view.profile';
import UserGroups from '../../users/user-group/user.groups';
import UserAccounts from '../../users/user-accounts/accounts';
import ActivityPopup from '../../users/user-activities/activity.popup';
import ContactDetails from '../../users/user-contact-details/contacts';



interface TabItem {
  buttonName: string;
  bodyContent: React.ReactNode;
}

interface TabsNavProps {
  userId?: number;
}

const UserViewTabsNavigation: React.FC<TabsNavProps> = ({ userId }) => {

 

  return (
    <div className={styles.container}>
      
    </div>
  );
};

export default UserViewTabsNavigation;
