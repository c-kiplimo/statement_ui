import React, { useState } from 'react';
import styles from "./tabs.module.css";
import AccountsPage from '../../accounts/accounts';
import ActivitiesStatus from '../../activities/activities.status';
import RestrictionsOverview from '../../restrictions/restrictions-overview/restrictions.overview';
import TabNavigations from '../../widgets/acctSetup-navigations-items/tab.navigations';
import AccountsStatus from '../../customers/accountUsers/users.status';
import { AccountProfileProvider } from '../../context/account.contex';

interface TabItem {
  buttonName: string;
  bodyContent: React.ReactNode;
}

interface TabsNavProps {
  userId?: number;
}

const TabsNav: React.FC<TabsNavProps> = ({ userId }) => {

  const tabItems: TabItem[] = [
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

  return (
    <div className={styles.container}>
      <TabNavigations tabItems={tabItems}/>
    </div>
  );
};

export default TabsNav;
