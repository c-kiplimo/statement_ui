import React, { useState } from "react";
import styles from "./groupConfirm.module.css";
import CheckboxComponent from "@/src/components/widgets/checkbox/checkbox";
import { Modal } from "antd";
import FailureModal from "@/src/components/widgets/failure-widget/failure";
import SuccessModal from "@/src/components/widgets/success-widget/success";
import { CheckOutlined } from "@ant-design/icons";
import { useGroup } from "../context/permissionsContext";
import { useRouter } from "next/navigation";
import { CREATEUSERGROUP } from "@/src/services/usermanagement/create.user.group.service";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import { usePlatformId } from "@/src/hooks/platformId";

type GroupCreationConfirmProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const GroupCreationConfirm: React.FC<GroupCreationConfirmProps> = ({
  onConfirm,
  onCancel,
}) => {
  const { groupName, description, permissions } = useGroup();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isFailureVisible, setIsFailureVisible] = useState(false);
  const router = useRouter();
  const profile = useProfileCreated();
  const userId = profile?.userId;
  const platformId = usePlatformId();

  const permissionsData = [
    {
      title: "LOAN",
      permissions: ["VIEW LOAN", "UPDATE LOAN STATUS"],
    },
    {
      title: "ACCOUNT",
      permissions: ["CREATE ACCOUNT", "DELETE ACCOUNT", "UPDATE ACCOUNT"],
    },
    {
      title: "CARD",
      permissions: ["VIEW CARD", "DELETE CARD", "UPDATE CARD"],
    },
  ];

  const filteredPermissionsData = permissionsData
    .map((section) => ({
      title: section.title,
      permissions: section.permissions.filter((permission) =>
        permissions.includes(permission)
      ),
    }))
    .filter((section) => section.permissions.length > 0);

  const handleConfirm = async () => {
    try {
      const userPayload = {
        platformId: platformId.toString(),
        groupName,
        description,
        userId: userId!,
        permission: permissions,
      };

      await CREATEUSERGROUP(userPayload);

      setIsSuccessVisible(true);
      onConfirm();
    } catch (error) {
      console.error("Group creation failed:", error);
      setIsFailureVisible(true);
    }
  };

  const handleOkClick = () => {
    setIsSuccessVisible(false);
    router.push("/statement/user-management");
  };

  const handleTryAgainClick = () => {
    setIsFailureVisible(false);
    handleConfirm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.cancelButton}></div>
      <div className={styles.header}>
        <div className={`${styles.title} h5b`}>Confirm New Group Creation</div>
        <div className={`${styles.description} bodyr`}>
          Please review the group details below before confirming the creation
          of a new group. Ensure all information is accurate.
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
              <div className={`${styles.descriptionname} bodyr`}>
                Description:
              </div>
              <div className={`${styles.group} bodyr`}>{description}</div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.selectedPermissions}>
            <div className={`${styles.permissionstitle} bodyr`}>
              ASSIGNED PERMISSIONS
            </div>
            <div className={styles.permissions}>
              <div className={styles.checkboxdiv}>
                <div className={styles.topdiv}>
                  {filteredPermissionsData.slice(0, 2).map((section) => (
                    <div key={section.title} className={styles.acctpermissions}>
                      <div className={`${styles.cardName} h6r`}>
                        {section.title}
                      </div>
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
                      <div className={`${styles.cardName} h6r`}>
                        {section.title}
                      </div>
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
        <button className={`${styles.cancelBtton} bodyr`} onClick={onCancel}>
          Cancel
        </button>
        <button
          className={`${styles.confirmButton} bodyr`}
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>

      <Modal
        width={"28%"}
        visible={isFailureVisible}
        footer={null}
        onCancel={() => setIsFailureVisible(false)}
      >
        <FailureModal
          onCancelClick={() => setIsFailureVisible(false)}
          onTryAgainClick={handleTryAgainClick}
        >
          <FailureModal.Icon>
            <img src={"/warning.svg"} width={56} height={56} alt="warning" />
          </FailureModal.Icon>
          <FailureModal.title title="Group Creation Failed" />
          <FailureModal.description description="An error occurred while creating the group. Please try again later" />
        </FailureModal>
      </Modal>

      <Modal
        width={"29%"}
        visible={isSuccessVisible}
        footer={null}
        onCancel={() => setIsSuccessVisible(false)}
      >
        <SuccessModal onOkClick={handleOkClick}>
          <SuccessModal.Icon>
            <CheckOutlined />
          </SuccessModal.Icon>
          <SuccessModal.title title="Group Created Successfully" />
          <SuccessModal.description description="The group has been successfully created" />
        </SuccessModal>
      </Modal>
    </div>
  );
};

export default GroupCreationConfirm;
