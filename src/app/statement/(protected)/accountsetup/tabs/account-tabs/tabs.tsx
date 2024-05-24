import React from 'react'
import styles from "./tabs.module.css"
import Accountsstatus from '../../customers/accountUsers/users.status'
import RestrictionsOverview from '../../customers/accountRestrictions/restrictions.overview'
import TabNavigations from '../../widgets/acctSetup-navigations-items/tab.navigations'
import ActivitiesStatus from '../../customers/accountActivities/activities.status'


type useridprops={
  userId?:number
}

const TabsNav = (props:useridprops) => {
  const tabItems = [ 
    {
      buttonName: 'Users',
      bodyContent: <Accountsstatus />,
    },

    
    {
      buttonName: 'Activities',
      bodyContent: <ActivitiesStatus/>,
    },
    
    {
      buttonName: 'Restrictions',
      bodyContent:<RestrictionsOverview/>
    }
  ];
  
  return (
    <div className={styles.container}>
       <TabNavigations tabItems={tabItems} /> 
    </div>
  )
}

export default TabsNav
