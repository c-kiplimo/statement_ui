import React from "react";
import styles from "./delete.group.user.module.css";

interface DeleteGroupUserProps {
    onCancel: () => void;
  }


const DeleteGroupUser = ({ onCancel }:DeleteGroupUserProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.cance}></div>
      <div className={styles.head}>
        <div className={`${styles.title} h5b`}>Confirm User Removal</div>
        <div className={`${styles.titledescription} bodyr`}>
          Are you sure you want to remove this user from the group? This action
          cannot be undone.
        </div>
      </div>
      <div className={styles.body}>
        <div className={`${styles.userDetailsHead} bodym`}>USER DETAILS</div>
        <div className={styles.userDetails}>
          <div className={styles.Details}>
            <div className={`${styles.credentialtitle} bodyr`}>Name:</div>
            <div className={`${styles.credential} bodym`}>Abia Mbabazi</div>
          </div>
          <div className={styles.Details}>
            <div className={`${styles.credentialtitle} bodyr`}>Phone Number:</div>
            <div className={`${styles.credential} bodym`}>+250 788 888 888</div>
          </div>
          <div className={styles.Details}>
            <div className={`${styles.credentialtitle} bodyr`}>Email address:</div>
            <div className={`${styles.credential} bodym`}>abbymbabazi@gmail.com</div>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          className={`${styles.canceButton} bodyr`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className={`${styles.ConfirmButton} bodyr`}>Confirm</button>
      </div>
    </div>
  );
};

export default DeleteGroupUser;
