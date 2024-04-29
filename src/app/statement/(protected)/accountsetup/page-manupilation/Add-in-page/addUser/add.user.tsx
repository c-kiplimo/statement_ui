import React, { FC } from "react";
import AddItem from "../../../widgets/forms/add.form";
import styles from "./create.restriction.module.css";
import { CloseOutlined } from "@ant-design/icons";

interface CreateRestrictionProps {
  visible: boolean;
  onCancel: () => void;
}

const AddUserModal = ({
  visible,
  onCancel,
}:CreateRestrictionProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.container}>
            <div className={styles.body}>
          <AddItem
            headerText={"Add User"}
            inputTitle1={"User Name"}
            placeholder1={"Enter Name"}

            inputTitle4={"User Role"}
            placeholder4={"Enter Description"}

            inputTitle2={"Status"}
            placeholder2={"Enter Description"}

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
        </div>
  );
};

export default AddUserModal;
