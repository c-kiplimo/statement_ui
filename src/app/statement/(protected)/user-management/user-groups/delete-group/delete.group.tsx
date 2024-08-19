import React, { useEffect, useState } from "react";
import styles from "./delete.group.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { fetchSingleUserGroup } from "@/src/lib/actions/user.groups.action";
import { Modal, Spin } from "antd";
import GroupsHandler from "@/src/services/usermanagement/usergroups.services";
import { usePlatformId } from "@/src/hooks/platformId";
import useProfileId from "@/src/hooks/profileId";
import DeletionSuccess from "./confirm-delete-success-modal)/deletion.success";
import DeleteGroupFail from "./confirm-failure-moda/confirm.failure";

const data = [
  {
    title: "Account permission",
    permissions: [
      { name: "View Acct" },
      { name: "Edit Acct" },
      { name: "Delete Acct" },
    ],
  },
  {
    title: "Loan permission",
    permissions: [
      { name: "View Loaning" },
      { name: "Edit Loan" },
      { name: "Delete Loan" },
    ],
  },
  {
    title: "Mt978 permission",
    permissions: [
      { name: "View Mt978" },
      { name: "Edit Mt978" },
      { name: "Delete Mt978" },
    ],
  },
  {
    title: "Check permission",
    permissions: [
      { name: "View Check" },
      { name: "Edit Check" },
      { name: "Delete Check" },
    ],
  },
];

type GroupPermissions = {
  title: string;
  permissions: Array<{ name: string }>;
};

export type GroupsInformation = {
  totalUsers?: number;
  groupname: string;
  groupdesc: string;
  permissions: GroupPermissions[];
};

type GroupProps = {
  groupId: string;
  onCancel: () => void;
  onSuccessfulDeletion: () => void;
};

const DeleteGroup = ({
  groupId,
  onCancel,
  onSuccessfulDeletion,
}: GroupProps) => {
  const [groupData, setGroupData] = useState<GroupsInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmSuccessOpen, setConfirmSuccessOpen] = useState(false);
  const [confirmFailureOpen, setConfirmFailureOpen] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const handler = GroupsHandler();
  const platformId = usePlatformId();
  const customerId = useProfileId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleUserGroup(parseInt(groupId));
        setGroupData(data);
      } catch (err) {
        setError("Failed to fetch group data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [groupId]);

  const handleSuccessModalOpen = () => {
    setConfirmSuccessOpen(true);
  };

  const handleSuccessModalCancel = () => {
    setConfirmSuccessOpen(false);
    onSuccessfulDeletion();
  };

  const handleFailureModalOpen = () => {
    setConfirmFailureOpen(true);
  };

  const handleFailureModalCancel = () => {
    setConfirmFailureOpen(false);
    setRetrying(false);
    onCancel();
  };

  const confirmDelete = async () => {
    try {
      await handler.deleteUsersGroup(
        groupId,
        customerId!.toString(),
        platformId.toString()
      );
      handleSuccessModalOpen();
      setRetrying(false);
      handleFailureModalCancel();
    } catch (error) {
      handleFailureModalOpen();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title="Confirm User Group Deletion"
          titleStyle={{ fontSize: "25px", fontWeight: "700" }}
        />
        <VerticalInfoDescription
          title="Are you sure you want to Delete this Group? Please confirm your decision"
          titleStyle={{ color: "#6F7269" }}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyContent}>
          <div className={styles.bodyheader}>
            <VerticalInfoDescription
              title="GROUP DETAILS"
              titleStyle={{ fontWeight: "500" }}
            />
          </div>
          <div className={styles.bodytext}>
            <div className={styles.bodyItem}>
              <VerticalInfoDescription
                title="Group Name"
                titleStyle={{ color: "#6F7269" }}
              />
              <VerticalInfoDescription
                title={groupData?.groupname || "N/A"}
                titleStyle={{ fontWeight: "550", textAlign: "right" }}
              />
            </div>
            <div className={styles.bodyItems}>
              <span
                className={`${styles.description} bodyr`}
                style={{ color: "#6F7269" }}
              >
                Description
              </span>
              <span className={`${styles.descriptions} bodym`}>
                {groupData?.groupdesc || "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.bheader}>
            <VerticalInfoDescription
              title="ASSIGNED PERMISSIONS"
              titleStyle={{ fontWeight: "500" }}
            />
          </div>
          <div className={styles.bottomcontent}>
            {groupData?.permissions.map((category, index) => (
              <div key={index} className={styles.permissionCategory}>
                <h1 className={styles.permissionTitle}>{category.title}</h1>
                <div className={styles.permissionGrid}>
                  {category.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className={styles.permissionItem}>
                      <input
                        type="checkbox"
                        id={`perm-${index}-${permIndex}`}
                        name={permission.name}
                        checked
                        disabled
                      />
                      <label
                        htmlFor={`perm-${index}-${permIndex}`}
                        className={styles.permissionLabel}
                      >
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={`${styles.cancelbtn} bodyr`} onClick={onCancel}>
          Cancel
        </button>
        <button
          className={`${styles.confirmbtn} bodyr`}
          onClick={confirmDelete}
        >
          Confirm
        </button>
      </div>

      <>
        <Modal
          open={confirmSuccessOpen}
          onCancel={handleSuccessModalCancel}
          footer={null}
          width={500}
          centered
        >
          <DeletionSuccess
            title={"Group Deleted Successfully"}
            description={`The group ${groupData?.groupname} has been Successfully Deleted`}
            onClose={handleSuccessModalCancel}
          />
        </Modal>
      </>

      <>
        <Modal
          open={confirmFailureOpen}
          onCancel={handleFailureModalCancel}
          footer={null}
          width={380}
          centered
        >
          <DeleteGroupFail
            title={"Group Deletion Failed"}
            description={
              "An error occurred while trying to delete the group. Please try again later."
            }
            onClick={confirmDelete}
            onCancel={handleFailureModalCancel}
          />
        </Modal>
      </>
    </div>
  );
};

export default DeleteGroup;
