import React from 'react'
import styles from './user.deletion.module.css'
import VerticalInfoDescription from '@/src/components/atoms/text/vertical-info-description'
type GroupUserProps ={
    onCancel:()=>void;
    onConfirm:()=>void;
    name:string;
    phoneno:string;
    email:string;

}
const GroupUserDeletion = ({onCancel, onConfirm, name, phoneno, email}:GroupUserProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription title={'Confirm User Removal'} titleStyle={{fontWeight:'700', fontSize:'25px'}}/>
        <VerticalInfoDescription title={'Are you sure you want to remove this user from the group? This action cannot be undone.'} titleStyle={{color:'#6F7269'}}/>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTitle}>
            <VerticalInfoDescription title={'USER DETAILS'} titleStyle={{fontWeight:'500'}}/>
        </div>
        <div className={styles.bodyContent}>
            <span className={styles.content}>
                <span className={`${styles.bodytext} bodyr`}>Names:</span>
                <span className={`bodym`}>{name}</span>
            </span>
            <span className={styles.content}>
                <span className={`${styles.bodytext} bodyr`}>Phone Number:</span>
                <span className={`bodym`}>{phoneno}</span>
            </span>
            <span className={styles.content}>
                <span className={`${styles.bodytext} bodyr`}>Email address:</span>
                <span className={`bodym`}>{email}</span>
            </span>
        </div>
        <div className={styles.button}>
            <button className={styles.cancelbtn} onClick={onCancel}>Cancel</button>
            <button className={styles.confirmbtn} onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default GroupUserDeletion
