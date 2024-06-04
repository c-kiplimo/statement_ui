import React, { FC } from "react";
import AddItem from "../../../widgets/forms/add.form";
import styles from "./add.user.module.css";
import { CloseOutlined } from "@ant-design/icons";

interface CreateRestrictionProps {
  visible: boolean;
  onCancel: () => void;
  roleOptions: string[];
  statusOptions: string[];
}

const AddUserModal: FC<CreateRestrictionProps> = ({
  visible,
  onCancel,
  roleOptions,
  statusOptions
}) => {
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

              inputTitle2={"User Role"}
              placeholder2={"Select Role"}
              roleOptions={roleOptions}

              inputTitle3={"Status"}
              placeholder3={"Select Status"}
              statusOptions={statusOptions}

              buttonText={"Create User"}
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
