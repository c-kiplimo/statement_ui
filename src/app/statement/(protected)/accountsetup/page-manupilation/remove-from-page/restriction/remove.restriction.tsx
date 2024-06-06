import React, { FC, useState } from "react";
import styles from "./remove.restriction.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Alert } from "antd";
import { deleteRestriction } from "@/src/services/account/delete.restriction.service";

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
  const [error, setError] = useState<string | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  if (!visible) {
    return null;
  }

  const handleYesClick = async () => {
    setIsButtonClicked(true);
    setError(null);
    try {
      await deleteRestriction(restrictionId);
      onCancel();
    } catch (error) {
      console.error("Error deleting restriction:", error);
      setError("Failed to delete the restriction. Please try again.");
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
            <Button className={`${styles.Nobutton} bodym`} onClick={onCancel} style={{ color: "#F30039" }}>
              NO
            </Button>
            <Button
              className={styles.Yesbutton}
              style={{ color: "#FFFFFF", background:"#F30039" }}
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

export default RemoveRestriction;
