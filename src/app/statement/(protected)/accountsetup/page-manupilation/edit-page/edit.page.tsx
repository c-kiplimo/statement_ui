import React, { FC } from "react";
import AddItem from "../../widgets/forms/add.form";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./edit.page.module.css"

interface EditPageProps {
    visible: boolean;
    onCancel: () => void;
  }
  
  const EditPageModal: FC<EditPageProps> = ({
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
      <AddItem
        headerText={"Edit Restriction"}
        inputTitle1={"Restriction Name"}
        placeholder1={"Withdraw Money"}
        inputTitle4={"Description"}
        placeholder4={"4,000,000 Per day"}
        buttonText={"Create Restriction"}
        closeIcon={
            <button onClick={onCancel}>
              <CloseOutlined />
            </button>
          }/>
      </div>
      </div>
    </div>
  );
};

export default EditPageModal;
