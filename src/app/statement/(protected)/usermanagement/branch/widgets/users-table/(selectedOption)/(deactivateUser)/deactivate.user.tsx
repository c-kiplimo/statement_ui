import React from 'react'
import styles from './deactivate.user.module.css'
import { UserDeleteOutlined } from '@ant-design/icons';

type DeactivateUserProps = {
    selectedId:string;
    onClose?:()=>void;
}
const DeactivateUser = (props:DeactivateUserProps) => {
  return (
    <div className={styles.container}>
        <div className={styles.usericon}><UserDeleteOutlined /></div>
        <div className={styles.body}>
            <div className={styles.title}>
                <h1 className={`h6b`}>Deactivate User</h1>
                <p>Are you sure you want to deactivate Daniel?</p>
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.noButton} bodym`} onClick={props.onClose}>No</button>
                <button className={`${styles.yesButton} bodyr`}>Yes</button>
            </div>
        </div>
    </div>
  )
}

export default DeactivateUser