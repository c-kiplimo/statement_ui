import React, { useState } from 'react';
import styles from './delete.restriction.module.css';
import ConfirmFailure from '../(confirm-failure-modal)/confirm.failure';
import { Modal } from 'antd';

type DeleteRestrictionProps ={
    restrictionId:string;
    onCancel:()=>void;
}

const DeleteRestriction = ({restrictionId, onCancel}:DeleteRestrictionProps) => {
    const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteConfirm = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <span className={`${styles.title} h5b`}>Confirm Deletion</span>
            <span className={`${styles.description} bodyr`}>Are you sure you want to delete this restriction? This action cannot be undone. Please confirm your decision</span>
        </div>
        <div className={styles.body}>
            <div className={`${styles.bodyTitle} bodym`}>RESTRICTION DETAILS</div>
            <div className={styles.bodyData}>
                <div className={styles.nameData}>
                    <span className={`${styles.name} bodyr`}>Name:</span>
                    <span className={`${styles.desc} bodyr`}>Withdraw Money</span>
                </div>
                <div className={styles.nameData}>
                <span className={`${styles.name} bodyr`}>Description:</span>
                <span className={`${styles.desc} bodyr`}>Restricted to withdraw 5,000,000 KES</span>
                </div>
            </div>
        </div>
        <div className={styles.buttons}>
            <button className={styles.cancelbtn} onClick={onCancel}>Cancel</button>
            <button className={styles.confirmbtn} onClick={handleDeleteConfirm}>Confirm</button>
        </div>
        {isModalVisible && (
        <Modal 
        onCancel={handleCloseModal}
        open={isModalVisible}
        width={380}
        footer={null}
        >
          <ConfirmFailure title={'Restriction Deletion Failed'} description={'An error occurred while trying to delete the restriction. Please try again later'} onClick={handleDeleteConfirm} onCancel={handleCloseModal} />
        </Modal>
      )}
    </div>
  )
}

export default DeleteRestriction
