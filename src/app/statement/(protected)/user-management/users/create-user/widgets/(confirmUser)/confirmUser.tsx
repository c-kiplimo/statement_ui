import React from "react";
import styles from "./confirmUser.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import ConfirmationDetails from "@/src/components/widgets/confirmation-details/confirmation-details";
import { TeamOutlined } from "@ant-design/icons";

type ConfirmRegistrationModalProps = {
  onCancel: () => void;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  userGroups: User_Group[];
  handleOk: (e:any) => void;
};

const ConfirmRegistrationModal = ({
  onCancel,
  firstName,
  lastName,
  email,
  mobileNumber,
  userGroups,
  handleOk,
}: ConfirmRegistrationModalProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title={"Confirm New User Creation"}
          titleStyle={{ fontWeight: "700", fontSize: "25px" }}
        />
        <VerticalInfoDescription
          title={
            "Please review the user details below before confirming the creation of a new user account. Ensure all information is accurate"
          }
        />
      </div>
      <div className={styles.body}>
        <div className={styles.userDetails}>
          <div className={styles.title}>
            <VerticalInfoDescription
              title={"USER DETAILS"}
              titleStyle={{ fontWeight: "500" }}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.userDesc}>
              <VerticalInfoDescription
                title={"Name:"}
                titleStyle={{ color: "var(--Text-Text-Description-01)" }}
              />
              <VerticalInfoDescription
                title={`${firstName} ${lastName}`}
                titleStyle={{ fontWeight: "600" }}
              />
            </div>
            <div className={styles.userDesc}>
              <VerticalInfoDescription
                title={"Phone Number"}
                titleStyle={{ color: "var(--Text-Text-Description-01)" }}
              />
              <VerticalInfoDescription
                title={mobileNumber}
                titleStyle={{ fontWeight: "600" }}
              />
            </div>
            <div className={styles.userDesc}>
              <VerticalInfoDescription
                title={"Email Address:"}
                titleStyle={{ color: "var(--Text-Text-Description-01)" }}
              />
              <VerticalInfoDescription
                title={email}
                titleStyle={{ fontWeight: "600" }}
              />
            </div>
          </div>
        </div>
        <div className={styles.groupBody}>
          <div className={styles.title}>
            <VerticalInfoDescription
              title={"ASSIGNED GROUPS"}
              titleStyle={{ fontWeight: "500" }}
            />
          </div>
          <div className={styles.content}>
            {userGroups.map((group, index) => (
              <ConfirmationDetails
                key={index}
                title={group.name}
                description={group.description}
              >
                <TeamOutlined size={16} />
              </ConfirmationDetails>
            ))}
          </div>
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

export default ConfirmRegistrationModal;
