import React from 'react';
import styles from './success.module.css';

const SuccessModal = () => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Success!</h2>
          <button className={styles.closeButton}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          <p>Your action was successful.</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
