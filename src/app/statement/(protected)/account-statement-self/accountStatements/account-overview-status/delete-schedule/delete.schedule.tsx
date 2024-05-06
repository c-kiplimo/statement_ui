import React from "react";
import styles from "./delete.schedule.module.css";
import { deleteAccountSchedule } from "@/src/services/account/account";

interface DeleteScheduleProps {
  id: number;
  closeModal: () => void;
}
const DeleteSchedule = ({ id, closeModal }: DeleteScheduleProps) => {
  const handleConfirmDelete = async () => {
    try {
      await deleteAccountSchedule(id);
      // closeModal();
      window.location.reload();
    } catch (error) {
      throw new Error();
    }
  };

  const handleCancelButton = () => {
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.header}>
          <h2 className={`h6m`}>Remove Account</h2>
          <p className={`${styles.deleteText} bodyr`}>
            Are you Sure you want to delete this account?
          </p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.nobutton} onClick={handleCancelButton}>
            No
          </button>
          <button className={styles.yesbutton} onClick={handleConfirmDelete}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSchedule;
