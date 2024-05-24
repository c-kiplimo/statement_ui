import LastLogin from '@/src/components/widgets/userStatus/user.login.status'
import React from 'react'
import { profileDetails } from "@/src/lib/actions/profile.action";
import styles from "./user.profile.module.css"


export type profilesType={
    userName:string,
    industry:string,
    town:string,
    customerType:string,
    }

    type userprofileType={
      userId?:number
    }


const Userprofile = async (props:userprofileType) => {


    let profile:profilesType = await profileDetails(props.userId!.toString())
    
    

    const getLastLoginTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${date} ${time}`;
    };
    
  return (
  
    <div className={styles.container}>
        
       <LastLogin
          userName={profile.userName}
          industry={profile.industry}
          town={profile.town}
          customerType={profile.customerType}
          timezone={`GMT ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
          lastSeenTime={`Last login on ${getLastLoginTime()}`}
          userId={props.userId}
          icon={<img src="/teamusericon.png" alt="teamusericon" />} 
        /> 
        </div>   
  )
}

export default Userprofile
