import React, { FC } from "react";
import Removeruser from "../../../widgets/add-remove/remover.form";
import styles from "./remove.restriction.module.css";
import { CloseOutlined } from "@ant-design/icons";

interface RemoveRestrictionProps {
  visible: boolean;
  onCancel: () => void;
}

const RemoveRestriction: FC<RemoveRestrictionProps> = ({
  visible,
  onCancel,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className="container">
          <Removeruser
            header={"Remove Restriction"}
            description={"Are you Sure you want to delete this Restriction?"}
            optn1={"No"}
            optn2={"Yes"}
            closeIcon={<button onClick={onCancel}>
              <CloseOutlined />
            </button>} onClose={function (): void {
              throw new Error("Function not implemented.");
            } }            />
        </div>
      </div>
    </div>
  );
};

export default RemoveRestriction;
