"use client"
import React from 'react'
import styles from "./tabs.module.css"
import AccountsPage from '../../accounts/accounts'
import ActivitiesStatus from '../../activities/activities.status'
import RestrictionsOverview from '../../restrictions/restrictions-overview/restrictions.overview'
import TabNavigations from '../../widgets/acctSetup-navigations-items/tab.navigations'
import Accountsstatus from '../../customers/accountUsers/users.status'



type useridprops={
  userId?:number
}

const TabsNav = (props:useridprops) => {
  const tabItems = [
    {
      buttonName: 'Accounts',
      bodyContent:<AccountsPage userId={props.userId}/>
    },
    {
     buttonName: 'Users',
      bodyContent: <Accountsstatus />
     },
    {
      buttonName: 'Activities',
      bodyContent: <ActivitiesStatus userId={props.userId} />
    },
    {
      buttonName: 'Restrictions',
      bodyContent:<RestrictionsOverview userId={props.userId}/>
    }
  ];
  
  return (
    <div className={styles.container}>
       <TabNavigations tabItems={tabItems} /> 
    </div>
  )
}

export default TabsNav
