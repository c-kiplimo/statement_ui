import React, { useState } from "react";
import styles from "./remove.customer.user.module.css"
import { CloseOutlined } from "@ant-design/icons";
import { Alert, Button } from "antd";
import { deleteCustomerUser } from "@/src/services/customer/customer.user.service";


interface RemoveUserModalProps {
  visible: boolean;
  onCancel: () => void;
  userId: number;
  onRefreshData: () => void;
}

const RemoveUserModal: React.FC<RemoveUserModalProps> = ({
  visible,
  onCancel,
  userId,
  onRefreshData,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  if (!visible) {
    return null;
  }

  const handleYesClick = async () => {
    setIsButtonClicked(true);
    setError(null);
    try {
      await deleteCustomerUser(userId);
      onCancel();
      onRefreshData();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete the user. Please try again.");
    }
  };

  return (
    <div
      className={styles.modalBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <form className={styles.modalContent}>
        <div
          className={styles.closeIcon}
          onClick={onCancel}
          role="button"
          aria-label="Close"
        >
          <div className={styles.close}>
            <CloseOutlined />
          </div>
        </div>
        <div className={styles.formdiv}>
          <div className={`${styles.title} h4r`} id="modal-title">
            Remove User
          </div>
          <div className={`${styles.query} bodyr`}>
            Are you sure you want to delete this User?
          </div>
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className={styles.errorAlert}
            />
          )}
          <Button.Group className={styles.buttonGroup}>
            <Button
              className={`${styles.Nobutton} bodym`}
              onClick={onCancel}
              style={{ color: "#F30039" }}
            >
              NO
            </Button>
            <Button
              className={styles.Yesbutton}
              style={{ color: "#FFFFFF", background: "#F30039" }}
              onClick={handleYesClick}
            >
              YES
            </Button>
          </Button.Group>
        </div>
      </form>
    </div>
  );
};

export default RemoveUserModal;
