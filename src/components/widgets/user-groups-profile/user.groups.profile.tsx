import React, { ReactNode } from 'react'
import styles from "./user.groups.profile.module.css"


type profileProps = {
    icon: ReactNode;
    title: string;
    totalusers: string;
    address: string;
    editbutton: string;
    deletebutton: string;
    status:string;

}

const GroupsUserprofile = (
    { icon,
        title,
        totalusers,
        address,
        editbutton,
        deletebutton,
        status
    }: profileProps
) => {
    return (
        <div className={styles.container}>
            <div className={`${styles.icondiv} h6r`}>
                {icon}
            </div>
            <div className={styles.profileDetails}>
                <div className={styles.details}>
                <div className={styles.head}>
                    <div className={`${styles.title} h6r`}>{title}</div>
                    <div className={styles.numberOfUsers}>{totalusers}</div>
                </div>
                <div className={`${styles.address} bodyr`}>{address}</div>
                <div className={`${styles.prifileButtons} bodyr`}>
                    <span><button>{editbutton}</button></span>|<span><button>{deletebutton}</button></span>
                </div>
                </div>
                <div className={`${styles.status} bodyb`}>{status}</div>
            </div>
            
        </div>
    )
}

export default GroupsUserprofile