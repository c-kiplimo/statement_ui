import React, { useState, FC, useEffect } from "react";
import styles from "./add.user.groups.module.css";
import { createCustomerAccountUser } from "@/src/services/userprofile/create.user.service";
import { notification } from "antd";
import { CustomerAllUserGroupsAction } from "@/src/lib/actions/all.user.groups.action";

export type allgroupsTypes = {
  groupId: number;
  platformId: number;
  groupName: string;
  description: string;
};

type AddProps = {
  accountId: number;
};

const AddUserGroupsModal: FC<AddProps> = ({ accountId }) => {
  const [username, setUsername] = useState("");
  const [userGroups, setuserGroups] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<allgroupsTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CustomerAllUserGroupsAction(1);
        setSelectOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleuserGroupsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGroupId = parseInt(e.target.value, 10);
    const selectedGroup = selectOptions.find(group => group.groupId === selectedGroupId);
    setuserGroups(e.target.value);
    if (selectedGroup) {
      setDescription(selectedGroup.description);
    } else {
      setDescription("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createCustomerAccountUser({
        accountId: accountId,
        email: username,
        role: userGroups,
        status: description,
      });
      setUsername("");
      setuserGroups("");
      setDescription("");
      notification.success({
        message: "Success",
        description: "User assigned successfully",
      });
    } catch (error: any) {
      console.error("Error creating user:", error);
      if (error.response && error.response.status === 409) {
        notification.error({
          message: "Error",
          description: "User already added",
        });
      } else if (error.response && error.response.status === 404) {
        notification.error({
          message: "Error",
          description: "User not found",
        });
      } else if (error.response && error.response.status === 400) {
        notification.error({
          message: "Error",
          description: "Submission was unsuccessful",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Network error occurred",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <div className={styles.headerText}>Add user to a group</div>
            </div>

            <label className={styles.inputdiv}>
              <div className={styles.requiredUsername}>
                User Name
                <span className={styles.required}>*</span>
              </div>
            </label>
            <input
              className={styles.input}
              type="text"
              required
              id="username"
              name="username"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className={styles.inputdiv}>Select Group</label>
            <select
              className={styles.input}
              value={userGroups}
              onChange={handleuserGroupsChange}
            >
              <option value="">Select Group</option>
              {selectOptions.map((option) => (
                <option key={option.groupId} value={option.groupId}>
                  {option.groupName}
                </option>
              ))}
            </select>

            <label className={styles.inputdiv}>Description</label>
            <input
              className={styles.input}
              type="text"
              id="description"
              name="description"
              placeholder="Enter Description"
              value={description}
              readOnly
            />

            <div className={styles.bttndiv}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Creating User..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserGroupsModal;
