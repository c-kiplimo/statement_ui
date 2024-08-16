import React, { useEffect, useState } from 'react';
import styles from './delete.restriction.module.css';
import ConfirmFailure from '../(confirm-failure-modal)/confirm.failure';
import { Modal, notification } from 'antd';
import RestrictionHandler from '@/src/services/accountsetup/customer.restrictions';
import useProfileId from '@/src/hooks/profileId';
import { getSingleRestriction } from '@/src/lib/actions/account-setup/customer.restrictions.actions';

export type SingleRestrictionTypes ={
    id:number,
    name:string,
    description:string
} 

type DeleteRestrictionProps = {
    restrictionId: string;
    onCancel: () => void;
    onDeletionSuccess: () => void;
}

const DeleteRestriction = ({ restrictionId, onCancel, onDeletionSuccess  }: DeleteRestrictionProps) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [restriction, setRestriction]= useState<SingleRestrictionTypes>();
    const customerId = useProfileId();
    const handler = RestrictionHandler();

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await getSingleRestriction(Number(restrictionId));
            setRestriction(response);
        }
        fetchData();
    },[restrictionId])

    const handleDeleteConfirm = async () => {
      try {
        const response = await handler.deleteCustomerRestriction(Number(restrictionId));
        
        if (response) { 
          notification.success({
            message: 'Deletion Successful',
            description: 'The restriction has been successfully deleted.',
          });
          onDeletionSuccess();
          onCancel();
        } 
      } catch (error) {
        console.error('Deletion failed:', error);
        setModalVisible(true);
      }
    };
    

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={`${styles.title} h5b`}>Confirm Deletion</span>
                <span className={`${styles.description} bodyr`}>
                    Are you sure you want to delete this restriction? This action cannot be undone. Please confirm your decision.
                </span>
            </div>
            <div className={styles.body}>
                <div className={`${styles.bodyTitle} bodym`}>RESTRICTION DETAILS</div>
                <div className={styles.bodyData}>
                    <div className={styles.nameData}>
                        <span className={`${styles.name} bodyr`}>Name:</span>
                        <span className={`${styles.desc} bodyr`}>{restriction?.name}</span>
                    </div>
                    <div className={styles.nameData}>
                        <span className={`${styles.name} bodyr`}>Description:</span>
                        <span className={`${styles.desc} bodyr`}>{restriction?.description}</span>
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
                    <ConfirmFailure
                        title={'Restriction Deletion Failed'}
                        description={'An error occurred while trying to delete the restriction. Please try again later'}
                        onClick={handleDeleteConfirm}
                        onCancel={handleCloseModal}
                    />
                </Modal>
            )}
        </div>
    );
};

export default DeleteRestriction;
