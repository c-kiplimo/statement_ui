import React, { FC, useState } from "react";
import styles from "./remove.restriction.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { deleteRestriction } from "@/src/services/account/delete.restriction.action";
import { Button, Alert } from "antd";

interface RemoveRestrictionProps {
  visible: boolean;
  onCancel: () => void;
  restrictionId: number;
}

const RemoveRestriction: FC<RemoveRestrictionProps> = ({
  visible,
  onCancel,
  restrictionId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!visible) {
    return null;
  }

  const handleYesClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteRestriction(restrictionId);
      onCancel();
    } catch (error) {
      console.error("Error deleting restriction:", error);
      setError("Failed to delete the restriction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <form className={styles.modalContent}>
        <div className={styles.closeIcon} onClick={onCancel} role="button" aria-label="Close">
          <div className={styles.close}>
            <CloseOutlined />
          </div>
        </div>
        <div className={styles.formdiv}>
          <div className={`${styles.title} h4r`} id="modal-title">Remove Restriction</div>
          <div className={`${styles.query} bodyr`}>
            Are you sure you want to delete this restriction?
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
            <Button className={styles.bttnStyle} onClick={onCancel}>
              NO
            </Button>
            <Button
              className={styles.bttnStyle}
              type="primary"
              onClick={handleYesClick}
              loading={loading}
            >
              YES
            </Button>
          </Button.Group>
        </div>
      </form>
    </div>
  );
};

export default RemoveRestriction;
