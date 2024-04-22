import React from "react";
import Removeruser from "../../../widgets/add-remove/remover.form";
import styles from "./remove.user.module.css";
import { CloseOutlined } from "@ant-design/icons";

interface RemoveUserModalProps {
  visible: boolean;
  onCancel: () => void;
}

const RemoveUserModal: React.FC<RemoveUserModalProps> = ({ visible, onCancel }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
    <div className={styles.container} style={{ display: visible ? "block" : "none" }}>
      <Removeruser
        header={"Remove User"}
        description={"Are you sure you want to delete this User?"}
        optn1={"No"}
        optn2={"Yes"}
        closeIcon={<CloseOutlined />}
        onClose={onCancel}
      />

    </div>
    </div>
    </div>
  );
};

export default RemoveUserModal;
