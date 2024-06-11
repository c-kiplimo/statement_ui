import React from "react";
import styles from "./confirm.restrictions.module.css";
import { Button } from "antd";

type ConfirmrestrictionsProps ={
  onCancel:()=>void;
  onConfirm:()=>void;

}
const Confirmrestrictions = ({ onCancel, onConfirm }:ConfirmrestrictionsProps) => {
  return (
    <div className={styles.container}>
      <form className={styles.formdiv}>
        <div className={styles.textdiv}>
          <div className={`${styles.titlediv} h6m`}>Add Restriction</div>
          <div className={`${styles.confirmquerry} bodyr`}>
            Are you sure you want to add this restriction?
          </div>
        </div>
        <div className={styles.radiogroupdiv}>
          <Button key="cancel"  className={styles.canceldiv} onClick={onCancel}>
            Cancel
          </Button>
          <Button key="confirm"  className={styles.confirmdiv} onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Confirmrestrictions;
