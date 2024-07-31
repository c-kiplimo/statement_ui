import React, { useEffect, useState } from "react";
import styles from "./delete.group.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { fetchSingleUserGroup } from "@/src/lib/actions/user.groups.action";
import { Modal } from "antd";
import DeletionSuccess from "./confirm-delete-success-modal)/deletion.success";

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

type GroupProps = {
  groupId: string;
  onCancel:()=>void;
};

export type GroupsInformation = {
  groupname: string;
  groupdesc: string;
};

const DeleteGroup = ({ groupId, onCancel }: GroupProps) => {
  const [groupData, setGroupData] = useState<GroupsInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmSucessOpen, setConfirmSucessOpen] = useState(false);
  const [confirmFailureOpen, setConfirmFailureOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleUserGroup(parseInt(groupId),1);
        setGroupData(data);
      } catch (err) {
        setError("Failed to fetch group data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [groupId]);

  const handleSuccessModalOpen= ()=>{
    setConfirmSucessOpen(true);
  }

  const handleSuccessModalCancel= ()=>{
    setConfirmSucessOpen(false)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {groupId}
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
            {data.map((category, index) => (
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
        <button className={`${styles.cancelbtn} bodyr`} onClick={onCancel}>Cancel</button>
        <button className={`${styles.confirmbtn} bodyr`}>Confirm</button>
      </div>

      <>
      <Modal
      open={confirmSucessOpen}
      onCancel={handleSuccessModalCancel}
      >
        <DeletionSuccess title={"Group Deleted Successfully"} description={ `The group ${groupData?.groupname} has been Successfully Deleted`}/>
      </Modal>

      </>
    </div>

  );
};

export default DeleteGroup;




