import React, { FC } from "react";
import AddItem from "../../widgets/forms/add.form";
import styles from "./create.restriction.module.css";
import { CloseOutlined } from "@ant-design/icons";

interface CreateRestrictionProps {
  visible: boolean;
  onCancel: () => void;
}

const CreateRestrictionModal = ({
  visible,
  onCancel,
}:CreateRestrictionProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className="container">
          <AddItem
            headerText={"Create Restriction"}
            inputTitle1={"Restriction Name"}
            placeholder1={"Enter Name"}
            inputTitle4={"Description"}
            placeholder4={"Enter Description"}
            buttonText={"Create Restriction"}
            closeIcon={
              <button onClick={onCancel}>
                <CloseOutlined />
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRestrictionModal;
