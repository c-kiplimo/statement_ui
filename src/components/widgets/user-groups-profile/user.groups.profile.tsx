import React, { ReactNode } from 'react'
import styles from "./user.groups.profile.module.css"


type profileProps = {
    icon: ReactNode;
    title: string;
    totalusers: string;
    address: string;
    status:string;
    groupIdId:string;

}

const GroupsUserprofile = (
    { icon,
        title,
        totalusers,
        address,
        status
    }: profileProps
) => {
    return (
        <div className={styles.container}>
            <div className={`${styles.icondiv} h6r`}>
                {icon}
            </div>
            
                <div className={styles.details}>
                <div className={styles.head}>
                    <div className={`${styles.title} h6r`}>{title}</div>
                    <div className={styles.numberOfUsers}>{totalusers}</div>
                </div>
                <div className={`${styles.address} bodyr`}>{address}</div>
                <div className={`${styles.prifileButtons} bodyr`}>
                    <span><button>Edit Group </button></span>|<span><button>Delete group</button></span>
                </div>
                </div>
                <div className={`${styles.status} bodyb`}>{status}</div>
          
            
        </div>
    )
}

export default GroupsUserprofile