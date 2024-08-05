import React from "react";
import styles from "./removeUser.module.css";
import ConfirmationDetails from "@/src/components/widgets/confirmation-details/confirmation-details";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";

type RemoveUserProps = {
  selectedId?: string;
  onCancel: () => void;
  groupName: string;
  description: string;
  handleOk: (e: any) => void;
};

const RemoveUser = ({
  onCancel,
  groupName,
  description,
  handleOk,
}: RemoveUserProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <VerticalInfoDescription
            title={"Confirm Group Removal"}
            titleStyle={{ fontWeight: "700", fontSize: "25px" }}
          />
        </div>
        <div className={styles.description}>
          <VerticalInfoDescription
            title={
              "Are you sure you want to remove this user from the group? This action cannot be undone."
            }
            titleStyle={{color:"#6F7269"}}
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>
          <VerticalInfoDescription
            title={"GROUP DETAILS"}
            titleStyle={{ fontWeight: "500", fontSize: "16px",color:"#1A2600" }}
          />
        </div>
        <div className={styles.content}>
          <ConfirmationDetails
            title="Group Name:"
            description={groupName}
          ></ConfirmationDetails>
          <ConfirmationDetails
            title="Group Description:"
            description={description}
          ></ConfirmationDetails>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.confirmButton} onClick={handleOk}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RemoveUser;
