import React from "react";
import styles from "./remove.user.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { deleteUser } from "@/src/services/account/delete.user.acct.service";
import { Button } from "antd";

interface RemoveUserModalProps {
  visible: boolean;
  onCancel: () => void;
  accountId:number;
}

const RemoveUserModal: React.FC<RemoveUserModalProps> = ({ visible, onCancel,accountId }) => {
  if (!visible) {
    return null;
  }

  const handleYesClick = async () => {
    try {
      await deleteUser(accountId);
      onCancel();
    } catch (error) {
      console.error("Error deleting restriction:", error);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
    <form className={styles.modalContent}>
      <div className={styles.closeIcon} onClick={onCancel}>
        <div className={styles.close}>
          <CloseOutlined />
        </div>
      </div>
      <div className={styles.formdiv}>
        <div className={`${styles.title} h4r`}>Remove User</div>
        <div className={`${styles.query} bodyr`}>
          Are you sure you want to delete this User?
        </div>
        <Button.Group className={styles.buttonGroup}>
          <Button className={styles.bttnStyle} onClick={onCancel}>
            NO
          </Button>
          <Button className={styles.bttnStyle} type="primary" onClick={handleYesClick}>
            YES
          </Button>
        </Button.Group>
      </div>
    </form>
  </div>
);
};

export default RemoveUserModal;
