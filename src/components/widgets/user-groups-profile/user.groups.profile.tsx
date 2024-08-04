import React, { ReactNode, useState } from "react";
import styles from "./user.groups.profile.module.css";
import { Modal } from "antd";
import DeleteGroup from "@/src/app/statement/(protected)/user-management/user-groups/delete-group/delete.group";
import { useRouter } from "next/navigation";

type profileProps = {
  icon: ReactNode;
  title: string;
  totalusers: string;
  address: string;
  status: string;
  groupIdId: string;
};

const GroupsUserprofile = ({
  icon,
  title,
  totalusers,
  address,
  status,
  groupIdId,
}: profileProps) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const router = useRouter();

  const handleDeleteModalOpen = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleSuccessfulDeletion = () => {
    setDeleteModalVisible(false);
    router.push("/statement/user-management");
  };

  const handleSuccessfulUpdate = () => {
    router.push(
      `/statement/user-management/user-groups/update-user-group?groupId=${groupIdId}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.icondiv} h6r`}>{icon}</div>

      <div className={styles.details}>
        <div className={styles.head}>
          <div className={`${styles.title} h6r`}>{title}</div>
          <div className={styles.numberOfUsers}>{totalusers}</div>
        </div>
        <div className={`${styles.address} bodyr`}>{address}</div>
        <div className={`${styles.prifileButtons} bodyr`}>
          <span>
            <button onClick={handleSuccessfulUpdate}>Edit Group </button>
          </span>
          |
          <span>
            <button onClick={handleDeleteModalOpen}>Delete group</button>
          </span>
        </div>
      </div>
      <div className={`${styles.status} bodyb`}>{status}</div>

      <Modal
        open={deleteModalVisible}
        onCancel={handleDeleteModalCancel}
        width={700}
        footer={false}
      >
        <DeleteGroup
          groupId={groupIdId}
          onCancel={handleDeleteModalCancel}
          onSuccessfulDeletion={handleSuccessfulDeletion}
        />
      </Modal>
    </div>
  );
};

export default GroupsUserprofile;
