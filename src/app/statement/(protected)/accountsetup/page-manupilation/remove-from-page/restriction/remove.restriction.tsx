import React, { FC } from "react";
import styles from "./remove.restriction.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { deleteRestriction } from "@/src/services/account/delete.restriction.action";
import { Button } from "antd";

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
  if (!visible) {
    return null;
  }

  const handleYesClick = async () => {
    try {
      await deleteRestriction(restrictionId);
      onCancel();
    } catch (error) {
      console.error("Error deleting restriction:", error);
    }

  };

  console.log(deleteRestriction);
  

  return (
    <div className={styles.modalBackdrop}>
      <form className={styles.modalContent}>
        <div className={styles.closeIcon} onClick={onCancel}>
          <div className={styles.close}>
            <CloseOutlined />
          </div>
        </div>
        <div className={styles.formdiv}>
          <div className={`${styles.title} h4r`}>Remove Restriction</div>
          <div className={`${styles.query} bodyr`}>
            Are you sure you want to delete this restriction?
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

export default RemoveRestriction;
