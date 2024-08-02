import React, { useState } from "react";
import styles from "./confirm.group.update.module.css";
import CheckboxComponent from "@/src/components/widgets/checkbox/checkbox";
import { Modal } from "antd";
import FailureModal from "@/src/components/widgets/failure-widget/failure";
import SuccessModal from "@/src/components/widgets/success-widget/success";
import { CheckOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGroup } from "../context/permissionsContext";

// Define the type for the permissions data
interface PermissionSection {
  title: string;
  permissions: string[];
}

type GroupUpdateConfirmProps = {
  groupName: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const GroupUpdateConfirm: React.FC<GroupUpdateConfirmProps> = ({ groupName, description, onConfirm, onCancel }) => {
  const { permissions } = useGroup(); 
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isFailureVisible, setIsFailureVisible] = useState(false);
  const router = useRouter();

 
  const permissionsData: PermissionSection[] = [
    {
      title: "Account Permissions",
      permissions: [
        "View Account Details",
        "View Transactions",
        "Manage Accounts",
        "Generate Account Reports",
      ],
    },
    {
      title: "Loan Permissions",
      permissions: [
        "View Loan Details",
        "View Loan Repayments",
        "Manage Loans",
        "Generate Loan Reports",
      ],
    },
    {
      title: "MT 940 Permissions",
      permissions: [
        "View MT940 Statements",
        "Statement Download",
        "Upload MT940 Statements",
        "Configure Account",
      ],
    },
    {
      title: "Card Permissions",
      permissions: [
        "View Card Details",
        "Manage Cards",
        "View Card Transactions",
        "Loan Schedule",
      ],
    },
  ];

  const filteredPermissionsData = permissionsData
    .map(section => ({
      title: section.title,
      permissions: section.permissions.filter(permission => permissions.includes(permission))
    }))
    .filter(section => section.permissions.length > 0);

  const handleConfirm = async () => {
    try {
      setIsSuccessVisible(true);
      onConfirm();
    } catch (error) {
      setIsFailureVisible(true);
    }
  };

  const handleOkClick = () => {
    setIsSuccessVisible(false);
    router.push('/statement/user-management');
  };

  return (
    <div className={styles.container}>
      <div className={styles.cancelButton}></div>
      <div className={styles.header}>
        <div className={`${styles.title} h5b`}>Confirm Update</div>
        <div className={`${styles.description} bodyr`}>
        Are you sure you want to update this group’s Information? Please review the details before confirming
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={`${styles.profilehead} bodym`}>GROUP DETAILS</div>
          <div className={styles.profile}>
            <div className={styles.name}>
              <div className={`${styles.groupname} bodyr`}>Group Name:</div>
              <div className={`${styles.group} bodyr`}>{groupName}</div>
            </div>
            <div className={styles.namedescription}>
              <div className={`${styles.descriptionname} bodyr`}>Description:</div>
              <div className={`${styles.group} bodyr`}>{description}</div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.selectedPermissions}>
            <div className={`${styles.permissionstitle} bodyr`}>ASSIGNED PERMISSIONS</div>
            <div className={styles.permissions}>
              <div className={styles.checkboxdiv}>
                <div className={styles.topdiv}>
                  {filteredPermissionsData.slice(0, 2).map((section) => (
                    <div key={section.title} className={styles.acctpermissions}>
                      <div className={`${styles.cardName} h6r`}>{section.title}</div>
                      {section.permissions.map((permission) => (
                        <CheckboxComponent
                          key={permission}
                          text={permission}
                          checked={true}
                          disabled={true}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className={styles.lowerdiv}>
                  {filteredPermissionsData.slice(2).map((section) => (
                    <div key={section.title} className={styles.acctpermissions}>
                      <div className={`${styles.cardName} h6r`}>{section.title}</div>
                      {section.permissions.map((permission) => (
                        <CheckboxComponent
                          key={permission}
                          text={permission}
                          checked={true}
                          disabled={true}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsdiv}>
        <button className={`${styles.cancelBtton} bodyr`} onClick={onCancel}>Cancel</button>
        <button className={`${styles.confirmButton} bodyr`} onClick={handleConfirm}>Confirm</button>
      </div>

      <Modal
        width={"40%"}
        visible={isFailureVisible}
        footer={null}
        onCancel={() => setIsFailureVisible(false)}
      >
        <FailureModal>
          <FailureModal.Icon>
            <img src={'/warning.svg'} width={56} height={56} alt='warning'/>
          </FailureModal.Icon>
          <FailureModal.title title="Group Update Failed"/>
          <FailureModal.description description="An error occurred while updating the group. Please try again later"/>
        </FailureModal>
      </Modal>

      <Modal
        width={"29%"}
        visible={isSuccessVisible}
        footer={null}
        onCancel={() => setIsSuccessVisible(false)}
      >
        <SuccessModal onOkClick={handleOkClick}>
          <SuccessModal.Icon><CheckOutlined /></SuccessModal.Icon>
          <SuccessModal.title title="Group Updated Successfully"/>
          <SuccessModal.description description="The group has been successfully updated"/>
        </SuccessModal>
      </Modal>
    </div>
  );
};

export default GroupUpdateConfirm;
