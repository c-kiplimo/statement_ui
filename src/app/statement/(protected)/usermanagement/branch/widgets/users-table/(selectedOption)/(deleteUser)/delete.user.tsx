import React from 'react'
import styles from './delete.user.module.css'
import { UserHandler } from '@/src/services/usermanagement/user.service';

type DeleteUserProps={
    selectedId:string;
    onClose?:()=>void;
}





const DeleteUser = (props:DeleteUserProps) => {
    const handler = UserHandler()
    const handleConfirmDeleteUser = async ()=>{
        await handler.deleteUser(props.selectedId!)
        props.onClose!();
    }

    return (
    <div className={styles.container}>
        {props.selectedId}
        <div className={styles.body}>
            <div className={styles.titles}>
                <h1 className={`h6b`}>Remove User</h1>
                <p className={`bodyr`}>Are you sure you want to delete this User?</p>
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.noButton} bodym`} onClick={props.onClose}>No</button>
                <button className={`${styles.yesButton} bodyr`} onClick={handleConfirmDeleteUser}>Yes</button>
            </div>

        </div>
    </div>
  )
}

export default DeleteUser