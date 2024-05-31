import React from "react";
import styles from "./close.account.module.css";
import { closeAccount } from "@/src/services/account/account.help";
import { notification } from "antd";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import { useRouter } from "next/navigation";

type CloseAccountProps = {
  onModalCancel?: () => void;
};

const CloseAccount = ({ onModalCancel }: CloseAccountProps) => {
  const profile = useProfileCreated();
  const userId = profile?.userId;
  const router = useRouter();

  const handleCloseClick = async () => {
    if (!userId) {
      notification.error({
        message: 'User ID is missing',
      });
      return;
    }

    try {
      await closeAccount(userId);
      notification.success({
        message: 'Account Closed Successfully',
      });
      router.push('/');
    } catch (error: any) {
      if(error.message == 'Request failed with status code 500'){
        notification.error({
          message: 'Account Already Closed',
        });
      }else{
      notification.error({
        message: 'Failed to close account',
        description: error.response?.data?.message || error.message || 'An error occurred',
      });
    }

    }
  };

  const handleCancelClick = () => {
    if (onModalCancel) {
      onModalCancel();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <img src="/closeaccount.svg" alt="closeaccount" />
      </div>
      <div className={styles.bodyContent}>
        <div className={styles.content}>
          <h1 className={`${styles.headTitle} h6m`}>Account Closure</h1>
          <p className={`${styles.description} bodyr`}>
            Please note that closing the account will have consequences such as loss
            of access to services, deletion of data, or any associated fees or
            penalties.
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={handleCancelClick}>
            Cancel
          </button>
          <button className={styles.closeButton} onClick={handleCloseClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CloseAccount;
