import React from "react";
import styles from "./close.account.module.css";

type closeAccountprops = {
  onModalCancel?: () => void;
};
const CloseAccount = ({ onModalCancel }: closeAccountprops) => {
  const handleCancelClick = () => {
    onModalCancel!();
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
            Please not that closing account will have consequences such as loss
            of access to services, deletion of data or any associated fees or
            penalties.
          </p>
        </div>

        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={handleCancelClick}>
            Cancel
          </button>
          <button className={styles.closeButton}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CloseAccount;
